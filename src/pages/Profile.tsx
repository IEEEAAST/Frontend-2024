import { NavBar } from "../components/common/navbar";
import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Input,
  FormControl,
  Text,
  Textarea,
  Avatar,
  FormErrorMessage,
  AlertIcon,
  Alert,
  Box,
  Slide,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ListItem,
  List
} from "@chakra-ui/react";
import { UserContext } from "../App";
import getUser from "../firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { setNewPassword } from "../firebase/updatePassword";
import addStorage from "../firebase/addStorage";
import updateData from "../firebase/updateData";
import getDocument from "../firebase/getData";
import ArticleCard from "../components/Article/Card/ArticleCard.tsx"
import subscribeToCollection from "../firebase/subscribeToCollection.js";
import ArticleData from "../interfaces/ArticleData.tsx";

interface currentUserData {
  mobile: string;
  firstname: string;
  lastname: string;
  desc: string;
  profilePicture: File | null | string;
  newPassword: string;
  confirmPassword: string;
  oldPassword: string;
  roles?: string[];
}

export const Profile = () => {
  const [notMatchError, setNotMatchError] = useState<boolean>(false);
  const [oldPasswordNotEntered, setOldPasswordNotEntered] = useState<boolean>(false);
  const [incorrectOldPassword, setIncorrectOldPassword] = useState<boolean>(false);
  const [mobileInvalid, setMobileInvalid] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [ passnotRegix, setPassNotRegix ] = useState<boolean>(true);

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [self, setSelf] = useState<boolean>(false);
  const [articles, setArticles]= useState<ArticleData[]>();
  const { userData, setUserData, userId } = useContext(UserContext);
  const { name: id } = useParams<{ name: string }>();
  const mobileRegex = /^[0-9]{10}$/;
  const navigate = useNavigate();
  const location = useLocation();
  
// password regix
  const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // Define currentUserData state
  const [currentUserData, setCurrentUserData] = useState<currentUserData>({
    mobile: "",
    firstname: "",
    lastname: "",
    desc: "",
    profilePicture: null,
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
    roles: []
  });

  // Fetch user data and check if the `id` matches the logged-in user ID
  useEffect(() => {
    const fetchData = async () => {
        const { result } = await getDocument("users", id);
        if (result) {
          console.log(id);
          console.log(userId);
          if (id === userId) {
            setSelf(true);
          }
          setCurrentUserData({
            mobile: result.data()?.mobile || "",
            firstname: result.data()?.firstname || "",
            lastname: result.data()?.lastname || "",
            desc: result.data()?.desc || "",
            profilePicture: result.data()?.imgurl || null,
            newPassword: "",
            confirmPassword: "",
            oldPassword: "",
            roles: result.data()?.roles || [],
          });
        }
        const unsubscribe= subscribeToCollection("articles", ({ result, ids, error }: { result: any, ids: string[], error: any })=>{
          if(error){
            console.error('error fetching articles: ',error);
            return;
          }
            if (result && ids) {
            const articlesWithIds = result.map((article: ArticleData, index: number) => ({
              ...article,
              id: ids[index],
            }));
            setArticles(articlesWithIds.filter((article: ArticleData) => {
              return id === article.author;
            }));
            }
        })
        return () => unsubscribe();
    };

    fetchData();
  }, [id, userData, userId]);

  // Force update when the location changes
  useEffect(() => {
    setCurrentUserData((prevState) => ({
      ...prevState,
      mobile: "",
      desc: "",
      profilePicture: null,
      newPassword: "",
      confirmPassword: "",
      oldPassword: "",
      roles: []
    }));
  }, [location.pathname]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { id, value } = event.target;
    setCurrentUserData({
      ...currentUserData,
      [id]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCurrentUserData({ ...currentUserData, profilePicture: file });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    resetError();
    const storedcurrentUserData = {
      mobile: currentUserData.mobile,
      imgurl: typeof currentUserData.profilePicture === "string" ? currentUserData.profilePicture : "",
      desc: currentUserData.desc,
    };

    event.preventDefault();
    const user = await getUser();
    const { newPassword, confirmPassword, oldPassword, mobile, profilePicture, desc } = currentUserData;

    if (newPassword !== "") {
      if (newPassword !== confirmPassword) {
        setShowError(true);
        setErrorMessage("New and Confirm Password do not match!");
        setNotMatchError(true);
        return;
      }

      if (oldPassword === "") {
        setOldPasswordNotEntered(true);
        setShowError(true);
        setErrorMessage("Please enter your old password.");
        return;
      }

      let credential = EmailAuthProvider.credential(userData?.email!, oldPassword);

      try {
        await reauthenticateWithCredential(user, credential);
        if(!passwordRegix.test(newPassword)){
          setShowError(true);
          return;
        }
        else {
          setPassNotRegix(false)
        }
        await setNewPassword(user, newPassword);
        setEdit(true);
      }catch (error) {
        setShowError(true);
        setIncorrectOldPassword(true);
        setErrorMessage("Password is incorrect!");
        return;
      }
    }

    if (profilePicture) {
      console.log(currentUserData.profilePicture)
      if (typeof profilePicture !== "string") {
        await addStorage(currentUserData.profilePicture, user.uid).then((res) => {
          storedcurrentUserData.imgurl = res.link;
        });
      }
    }

    if (mobile !== "" && mobile !== userData!.mobile) {
      if (!mobileRegex.test(mobile)) {
        setShowError(true);
        setMobileInvalid(true);
        setErrorMessage("Invalid mobile number, Please enter a valid number");
        return;
      }
    }

    try {
      await updateData("users", user.uid, storedcurrentUserData);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setTimeout(() => {
          window.location.reload();
        }, 500)
      }, 1000);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const resetError = () => {
    setNotMatchError(false);
    setOldPasswordNotEntered(false);
    setMobileInvalid(false);
    setIncorrectOldPassword(false);
    setShowError(false);
  };

  const goback = () => {
    window.open("/", "_self");
  };

  // Determine if Tabs should be displayed

  return (
    <div>
        <Slide direction="top" in={showSuccess} style={{ zIndex: 300 }}>
          <Alert status="success" variant="solid" zIndex={300}>
            <AlertIcon />
            Data edited and uploaded successfully!
          </Alert>
        </Slide>

      <div className="pt-[100px] mx-16 flex-col justify-center">
      <div className="bg-[url('https://img.freepik.com/free-vector/abstract-orange-background_698452-2541.jpg')] bg-cover bg-center mt-11 h-[360px] rounded-3xl relative"></div>
      <div className="ml-16 -mt-20 z-0 relativem mb-44">
        <img
          className="absolute z-10 w-40 h-40 rounded-full object-cover mb-7"
          src={
            currentUserData.profilePicture
              ? typeof currentUserData.profilePicture === "string"
          ? `${currentUserData.profilePicture}`
          : URL.createObjectURL(currentUserData.profilePicture)
              : "src/assets/add-profile-picture-white@2x.png"
          }
          alt="Profile"
        />
      </div>
      <Tabs variant={'unstyled'}>
        <div className="flex justify-between items-center">
        <p className="text-4xl font-extrabold font-textmedium"> {currentUserData.firstname} {currentUserData.lastname}</p>
        <TabList>
          <Tab>Articles</Tab>
          <Tab>Contributions</Tab>
          <Tab>About</Tab>
          {self && <Tab>Settings</Tab>}
          {!self&&<button className="defaultButton my-auto">Follow</button>}
        </TabList>
        

        </div>
        <div className="flex gap-[10px] items-center font-extralight">
        <Text className="text-sm">0 Followers</Text>
        •︎
        <Text className="text-sm">0 Following</Text>
        </div>
        <TabPanels>
          <TabPanel>
            <Box>
            <div className="flex flex-col gap-8 mt-[40px]">{articles?.map((article: ArticleData, index: number)=> {
              return <ArticleCard key={index} article={article}/>
            })}</div>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
            <p>Contributions</p>
            </Box>
          </TabPanel>
          <TabPanel>
            <Text className={"font-body"} mb={4}> description goes here:{currentUserData.desc}</Text>
          </TabPanel>
    {self && (
    <TabPanel>
    
        <div className="form-container">
        <div className="h-fit">
          <div className="max-w-[600px]">
            <Text fontFamily={"SF-Pro-Display-Bold"} fontSize={40} mb={4}>Edit Profile</Text>
            <form onSubmit={handleSubmit}>
              <Text fontFamily={"SF-Pro-Display-Bold"} mb={4}>Change your Profile Picture:</Text>
              <FormControl isInvalid={showError && mobileInvalid}>
                <label htmlFor="profile-picture">
                  <Avatar
                    size="xl"
                    src={
                      currentUserData.profilePicture
                        ? typeof currentUserData.profilePicture === "string"
                          ? `${currentUserData.profilePicture}`
                          : URL.createObjectURL(currentUserData.profilePicture)
                        : "src/assets/add-profile-picture-white@2x.png"
                    }
                    borderRadius="full"
                    boxShadow="lg"
                    cursor="pointer"
                    mb={8}
                  />
                  <Input
                    type="file"
                    id="profile-picture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    display="none"
                    position="absolute"
                    opacity={0}
                    zIndex={-1}
                  />
                </label>
              </FormControl>

              <Text fontFamily={"SF-Pro-Display-Bold"}>Change your mobile number:</Text>
              <FormControl isInvalid={showError && mobileInvalid}>
                <Input
                  type="tel"
                  id="mobile"
                  value={currentUserData.mobile}
                  name="phoneNumber"
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  mb={4}
                  style={{
                    width: '80%',
                    border: 'none',
                    borderBottom: '1px solid rgb(4, 4, 62)',
                    outline: 'none',
                  }}
                />
                <FormErrorMessage mb={4} fontFamily={"SF-Pro-Text-Medium"}>
                  {errorMessage}
                </FormErrorMessage>
              </FormControl>

              <Text fontFamily={'SF-Pro-Display-Bold'} mb={2}>Description: </Text>
              <FormControl mb={10}>
                <Textarea
                  id="desc"
                  name="Description"
                  value={currentUserData.desc}
                  onChange={handleChange}
                  placeholder="Describe yourself"
                  width={800}
                  height={300}
                  boxSizing="border-box"
                  flexWrap={"wrap"}
                  flex={"flexbox"}
                />
              </FormControl>

              <Text fontFamily={'SF-Pro-Display-Bold'} mb={2}>Change your password: </Text>
              <FormControl isInvalid={(showError && notMatchError) || (showError && passnotRegix)}>
                <Input
                  type="password"
                  id="newPassword"
                  name="Password"
                  onChange={handleChange}
                  placeholder="New Password"
                  mb={4}
                  style={{
                    width: '80%',
                    border: 'none',
                    borderBottom: '1px solid rgb(4, 4, 62)',
                    outline: 'none',
                  }}
                />
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  mb={4}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  style={{
                    width: '80%',
                    border: 'none',
                    borderBottom: '1px solid rgb(4, 4, 62)',
                    outline: 'none',
                  }}
                />
                {!passnotRegix? (
                  <FormErrorMessage mb={4} fontFamily={"SF-Pro-Text-Medium"}>
                    {errorMessage}
                  </FormErrorMessage>
                ) : (
                  <FormErrorMessage mb={4} fontFamily={"SF-Pro-Text-Medium"}>
                    <List spacing={1} mt={2}>
                      <ListItem>Invalid Password! Passwords should:</ListItem>
                      <ListItem>
                        ! Be at least 8 characters long
                      </ListItem>
                      <ListItem>
                        ! Contain at least one lowercase letter
                      </ListItem>
                      <ListItem>
                        ! Contain at least one uppercase letter
                      </ListItem>
                      <ListItem>
                        ! Contain at least one digit
                      </ListItem>
                      <ListItem>
                        ! Contain at least one special character (e.g., !@#$%^&*)
                      </ListItem>
                    </List>
                </FormErrorMessage>
                )}
                
              </FormControl>

              <FormControl isInvalid={showError && (oldPasswordNotEntered || incorrectOldPassword)}>
                <Input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  onChange={handleChange}
                  placeholder="Old Password"
                  style={{
                    width: '80%',
                    border: 'none',
                    borderBottom: '1px solid rgb(4, 4, 62)',
                    outline: 'none',
                  }}
                />
                <FormErrorMessage mb={4} fontFamily={"SF-Pro-Text-Medium"}>
                  {errorMessage}
                </FormErrorMessage>
              </FormControl>

              <div className="flex flex-nowrap">
                <div className="pt-8 flex flex-nowrap items-center gap-4 flex-col">
                  <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                    <button
                      style={{
                        background: 'transparent',
                        padding: '8px',
                        width: '120px',
                        fontSize: '16px',
                        border: '2px solid #fff',
                        borderRadius: '20px',
                        color: '#fff',
                        textAlign: 'center',
                        fontFamily: 'SF-Pro-Display-Bold',
                      }}
                      onClick={goback}
                    >
                      Cancel
                    </button>
                    <button
                      className="defaultButton ml-2"
                      style={{
                        fontSize: '16px',
                        fontFamily: 'SF-Pro-Display-Bold',
                        width: '155px',
                        height: '35px',
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </TabPanel>
    )}
        </TabPanels>
      </Tabs>
      
      </div>

      <div className=" w-full flex justify-center h-fit">
      </div>
      </div>
  );
};
