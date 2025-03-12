import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
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
  List,
  Spinner,
  Center
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
import { convertNewLinesToBRTags, convertBRTagsToNewLines, toggleFollow } from "../utils.ts";
import UserData from "../interfaces/userData.tsx";
import { SocialIcon } from "../components/common/SocialIcon.tsx";
import DOMPurify from "dompurify";
import {Social} from "../interfaces/userData.tsx";

const defaultAvatar = <svg viewBox="0 0 128 128" className="w-full h-full bg-[#A0AEC0] rounded-full" role="img" aria-label=" avatar"><path fill="currentColor" d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"></path><path fill="currentColor" d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"></path></svg>;

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
  socials?: Social[];
}


export const Profile = () => {
  const [notMatchError, setNotMatchError] = useState<boolean>(false);
  const [oldPasswordNotEntered, setOldPasswordNotEntered] = useState<boolean>(false);
  const [incorrectOldPassword, setIncorrectOldPassword] = useState<boolean>(false);
  const [mobileInvalid, setMobileInvalid] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [ passnotRegix, setPassNotRegix ] = useState<boolean>(true);
  const [selectedUserData, setSelectedUserData]= useState<UserData>();

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [_edit, setEdit] = useState<boolean>(false);
  const [self, setSelf] = useState<boolean>(false);
  const [articles, setArticles]= useState<ArticleData[]>();
  const { userData, setUserData, userId } = useContext(UserContext);
  const { name: id } = useParams<{ name: string }>();
  const mobileRegex = /^[0-9]{10}$/;
  const location = useLocation();
  
  // password regix
  const passwordRegix = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const purifyConfig = {
    ALLOWED_TAGS: ['br', 'strong', 'em', 'ul', 'ol', 'li'],
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

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
    roles: [],
    socials: []
  });

  useEffect(() => {
    // Scroll to top immediately when the component mounts
    window.scrollTo({ top: 0, behavior: 'instant' });
    console.log(currentUserData);
  }, []);

  // Fetch user data and check if the `id` matches the logged-in user ID
  useEffect(() => {
    const fetchData = async () => {
      const { result } = await getDocument("users", id);
      if (result) {
        if (id === userId) {
          setSelf(true);
        }

        setSelectedUserData(result.data() as UserData)
        
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
          socials: result.data()?.socials || []
        });
      }
      const unsubscribe = subscribeToCollection("articles", ({ result, ids, error }: { result: any, ids: string[], error: any }) => {
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

  useEffect(() => {
    if (userData && userId && selectedUserData) {
      setSelf(id === userId);
    }
  }, [userData, userId, selectedUserData]);

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
      roles: [],
      socials: []
    }));
  }, [location.pathname]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { id, value } = event.target;
    if (["Facebook", "Instagram", "LinkedIn"].includes(id)) {
      setCurrentUserData({
        ...currentUserData,
        socials: currentUserData.socials?.some(social => social.name === id)
          ? currentUserData.socials.map(social =>
              social.name === id ? { ...social, url: value } : social
            )
          : [...(currentUserData.socials || []), { name: id as "Facebook" | "Instagram" | "LinkedIn", url: value }]
      });
    } else {
      setCurrentUserData({
        ...currentUserData,
        [id]: value,
      });
    }
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
      desc: convertNewLinesToBRTags(currentUserData.desc),
    };
    console.log(storedcurrentUserData);
    event.preventDefault();
    const user = await getUser();
    const { newPassword, confirmPassword, oldPassword, mobile, profilePicture } = currentUserData;

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
      } catch (error) {
        setShowError(true);
        setIncorrectOldPassword(true);
        setErrorMessage("Password is incorrect!");
        return;
      }
    }

    if (profilePicture) {
      console.log(currentUserData.profilePicture)
      if (typeof profilePicture !== "string") {
        addStorage(currentUserData.profilePicture, `profilepics/${user.uid}`).then((res) => {
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
      const filteredSocials = currentUserData.socials?.filter(social => social.url !== "");
      await updateData("users", user.uid, { ...storedcurrentUserData, socials: filteredSocials });
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
  if(!currentUserData||!selectedUserData) return <Center h={'100vh'}><Spinner size='xl'/></Center>

  return (
    <div>
      <Slide direction="top" in={showSuccess} style={{ zIndex: 300 }}>
        <Alert status="success" variant="solid" zIndex={300}>
          <AlertIcon />
          Data edited and uploaded successfully!
        </Alert>
      </Slide>
      <div className="pt-[100px] mx-8 md:mx-32 flex flex-col justify-center">
        <div className="bg-[url('https://img.freepik.com/free-vector/abstract-orange-background_698452-2541.jpg')] bg-cover bg-center mt-11 h-[100px] md:w-full md:h-[300px] rounded-3xl relative"></div>
        <div className=" ml-8 md:ml-16 -mt-14 md:-mt-20 z-0 relative mb-32 md:mb-44">
          {currentUserData.profilePicture ? (
            <img
              className="absolute z-10 w-24 h-24 md:w-40 md:h-40 rounded-full object-cover mb-7"
              src={
          typeof currentUserData.profilePicture === "string"
            ? `${currentUserData.profilePicture}`
            : URL.createObjectURL(currentUserData.profilePicture)
              }
              alt="Profile"
            />
          ) : (
            <div className="absolute z-10 w-24 h-24 md:w-40 md:h-40 rounded-full mb-7">
              {defaultAvatar}
            </div>
          )}
        </div>
        <Tabs size='sm' variant={'unstyled'}>
          <div className="flex  justify-between items-center flex-wrap">
            <div className="flex flex-col">
              <p className="text-2xl font-extrabold font-textmedium md:ml-16"> {currentUserData.firstname} {currentUserData.lastname}</p>
              <div className="flex gap-[10px] items-center font-extralight md:ml-16 mb-7 md:mb-0">
              <Text className="text-sm">{selectedUserData?.followers?.length || 0} Followers</Text>
              •︎
              <Text className="text-sm">{selectedUserData?.following?.users?.length || 0} Following</Text>
              <div className="flex gap-1">
                {selectedUserData?.socials?.map((social, index) => {
                  return (
                    <SocialIcon key={index} social={social} />
                  );
                })}
                </div>
              </div>
              </div>
              <div className="flex justify-center flex-wrap-reverse  w-full lg:justify-end ">
              <TabList>
                <Tab>Articles</Tab>
                {/*<Tab>Contributions</Tab> disabled for now*/ }
                <Tab>About</Tab>
                {/*self && <Tab>Settings</Tab>*/}
                {/*!self&&<button className="defaultButton my-auto">Follow</button>*/}
              </TabList>
              {self && <Tab>Settings</Tab>}
              {!self && 
                <button 
                  className="defaultButton my-auto"
                  onClick={() => {
                    if (userData && selectedUserData && id && userId) {
                      toggleFollow(selectedUserData, userData, id, userId, setSelectedUserData, setUserData)
                    }
                  }}
                >
                  {userId && 
                    selectedUserData?.followers.includes(userId)
                      ? "Unfollow"
                      : "Follow"
                  }
                </button>
              }
            </div>
          </div>

          <TabPanels>
            <TabPanel>
              <Box>
                <div className="flex flex-col gap-8 mt-[40px]">{articles?.map((article: ArticleData, index: number)=> {
                  return <ArticleCard key={index} article={article}/>
                })}</div>
              </Box>
            </TabPanel>
            {/*<TabPanel> disabled for now
              <Box>
              <p>Contributions</p>
              </Box>
            </TabPanel>*/}
            <TabPanel>
              <div className={"font-body mb-4"} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentUserData.desc ?? "",purifyConfig) }}></div>
            </TabPanel>
            {self && 
            <TabPanel>
              <div className="form-container">
                <div className="h-fit">
                  <div className="max-w-[600px]">
                    <Text fontFamily={"SF-Pro-Display-Bold"} fontSize={23} mb={4}>Edit Profile</Text>
                    <form onSubmit={ handleSubmit }>
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
                        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-[200px] md:h-[300px] box-border resize-y"
                          id="desc"
                          name="Description"
                          value={convertBRTagsToNewLines(currentUserData.desc)}
                          onChange={handleChange}
                          placeholder="Describe yourself"
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
                        {!passnotRegix
                          ? <FormErrorMessage mb={4} fontFamily={"SF-Pro-Text-Medium"}>
                              {errorMessage}
                            </FormErrorMessage>
                          : <FormErrorMessage mb={4} fontFamily={"SF-Pro-Text-Medium"}>
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
                        }
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
                        <Text fontFamily={'SF-Pro-Display-Bold'} my={4}>Social Media Links: </Text>
                        <FormControl mb={4} isInvalid={showError && !currentUserData.socials?.every(social => social.url === "" || isValidUrl(social.url))}>
                          <Input
                            type="url"
                            id="Facebook"
                            name="Facebook"
                            value={currentUserData.socials?.find(social => social.name === "Facebook")?.url || ""}
                            onChange={handleChange}
                            placeholder="Facebook URL"
                            mb={4}
                            style={{
                              width: '80%',
                              border: 'none',
                              borderBottom: '1px solid rgb(4, 4, 62)',
                              outline: 'none',
                            }}
                          />
                          <Input
                            type="url"
                            id="Instagram"
                            name="Instagram"
                            value={currentUserData.socials?.find(social => social.name === "Instagram")?.url || ""}
                            onChange={handleChange}
                            placeholder="Instagram URL"
                            mb={4}
                            style={{
                              width: '80%',
                              border: 'none',
                              borderBottom: '1px solid rgb(4, 4, 62)',
                              outline: 'none',
                            }}
                          />
                          <Input
                            type="url"
                            id="LinkedIn"
                            name="LinkedIn"
                            value={currentUserData.socials?.find(social => social.name === "LinkedIn")?.url || ""}
                            onChange={handleChange}
                            placeholder="LinkedIn URL"
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

                      <div className="flex flex-nowrap">
                        <div className="pt-8 flex flex-nowrap items-center gap-4 flex-col">
                          <div className="flex items-center gap-2 mb-2">
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
                              disabled={
                              currentUserData.mobile === selectedUserData?.mobile &&
                              currentUserData.desc === selectedUserData?.desc &&
                              currentUserData.profilePicture === selectedUserData?.imgurl &&
                              currentUserData.newPassword === "" &&
                              currentUserData.confirmPassword === "" &&
                              currentUserData.oldPassword === "" &&
                              JSON.stringify(currentUserData.socials) === JSON.stringify(selectedUserData?.socials)
                              }
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
            }
          </TabPanels>
        </Tabs>
      </div>
      <div className=" w-full flex justify-center h-fit"></div>
    </div>
  );
};
