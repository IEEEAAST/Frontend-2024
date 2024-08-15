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
import Triangle from "../assets/bg-triangle-ellipse@2x.png"

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
  const showTabs = self || currentUserData.roles?.includes("author")|| currentUserData.roles?.includes("admin");

  // Determine if Settings Tab should be displayed
  const showSettingsTab = self; // ??? use self ??

  return (
    <div>     
        <Slide direction="top" in={showSuccess} style={{ zIndex: 300 }}>
          <Alert status="success" variant="solid" zIndex={300}>
            <AlertIcon />
            Data edited and uploaded successfully!
          </Alert>
        </Slide>
      <NavBar />
      <div className="pt-[100px] w-full flex justify-center">
        {showTabs ? (
          <Tabs variant="unstyled" className="w-full">
            <TabList bg={'#151F33'} className="rounded-full w-fit mx-auto">
              <Tab className="border-r-2" style={{borderColor:'#1c2a44'}}>Profile</Tab>
              {(currentUserData.roles?.includes("admin") || currentUserData.roles?.includes("author")) && <Tab className={showSettingsTab?"border-r-2":""} style={{borderColor:'#1c2a44'}}>Articles</Tab>}
              
              {showSettingsTab && <>
              <Tab className="border-r-2" style={{borderColor:'#1c2a44'}}>Bookmarks</Tab>
              <Tab>Settings</Tab>
              </>            
              }
            </TabList>
            <TabPanels>
            <TabPanel>
            <Box className="w-full flex flex-col" m={5} ml={20}>
            <Text fontFamily={"SF-Pro-Display-Bold"} fontSize={40} mb={4}>Profile Details:</Text>
                  <Avatar
                    size="lg"
                    src={
                      currentUserData.profilePicture
                        ? typeof currentUserData.profilePicture === "string"
                          ? `${currentUserData.profilePicture}`
                          : URL.createObjectURL(currentUserData.profilePicture)
                        : "src/assets/add-profile-picture-white@2x.png"
                    }
                    borderRadius="full"
                    boxShadow="lg"
                    mb={4}
                  />
                  <Text fontFamily={"SF-Pro-Text-Medium"} mb={4}>Name: {currentUserData.firstname} {currentUserData.lastname}</Text>
                  <Text fontFamily={"SF-Pro-Text-Medium"} mb={4}>Mobile: {currentUserData.mobile}</Text>
                  <Text fontFamily={"SF-Pro-Text-Medium"} mb={2}>Description: </Text>
                  <Textarea value={currentUserData.desc} readOnly width={800} height={300}></Textarea>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box>
                <p>Articles</p>
                </Box>
              </TabPanel>
              <TabPanel>
                <p>Bookmarks</p>
              </TabPanel>
              <TabPanel>
              {self && (
                  <div className="form-container">
                  <div className="px-20 h-screen">
                    <div className="max-w-[600px] mt-5 max-sm:mt-10">
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
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <Box className="w-full flex flex-col" m={20}>
            <Text fontFamily={"SF-Pro-Display-Bold"} fontSize={40} mb={4}>Profile Details:</Text>
            <Avatar
              size="lg"
              src={
                currentUserData.profilePicture
                  ? typeof currentUserData.profilePicture === "string"
                    ? `${currentUserData.profilePicture}`
                    : URL.createObjectURL(currentUserData.profilePicture)
                  : "src/assets/add-profile-picture-white@2x.png"
              }
              borderRadius="full"
              boxShadow="lg"
              mb={4}
            />
            <Text fontFamily={"SF-Pro-Text-Medium"} mb={4}>Name: {currentUserData.firstname} {currentUserData.lastname}</Text>
            <Text fontFamily={"SF-Pro-Text-Medium"} mb={4}>Mobile: {currentUserData.mobile}</Text>
            <Text fontFamily={"SF-Pro-Text-Medium"} mb={2}>Description: </Text>
            <Textarea value={currentUserData.desc} readOnly width={800} height={300}></Textarea>
          </Box>
        )}
        <div className="bottom-0 w-80 h-auto right-[-2vh] p-4 fixed max-sm:w-[45%]">
          <img src={Triangle} alt="Triangle" />
        </div>
      </div>
    </div>
  );
};
