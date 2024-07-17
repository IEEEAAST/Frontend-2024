import { NavBar } from "../components/common/navbar";
import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { Input, FormControl, Text, Textarea, Avatar, FormErrorMessage, AlertIcon, Alert, Box, Slide } from "@chakra-ui/react";
import { UserContext } from "../App";
import getUser from "../firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { setNewPassword } from "../firebase/updatePassword";
import addStorage from "../firebase/addStorage";
import updateData from "../firebase/updateData";
import ProfileMenu from "../components/common/profileMenu";

interface FormData {
    mobile: string;
    desc: string;
    profilePicture: File | null | string;
    newPassword: string;
    confirmPassword: string;
    oldPassword: string;
}


export const Profile = () => {

    // Errors
    const [notMatchError, setNotMatchError] = useState<boolean>(false);
    const [oldPasswordNotEntered, setoldPasswordNotEntered] = useState<boolean>(false);
    const [incorrectOldPassword, setIncorrectOldPassword] = useState<boolean>(false);
    const [mobileInvalid, setMobileInvalid] = useState<boolean>(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    //success useState
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    // const [edit, setEdit] = useState<boolean>(false);
    // const [warning, setWarning] = useState<boolean>(false);


    // Regix
    // const mobileRegix = /^\+\d{1,3}\d{10,14}(?:x.+)?$/ //regix with country code in mind
    const mobileRegix = /^01\d{9}$/ //regix without country code


    console.log()
    const { userData, setUserData } = useContext(UserContext);
    const [formData, setFormData] = useState<FormData>({
        mobile: "",
        desc: "",
        profilePicture: null,
        newPassword: "",
        confirmPassword: "",
        oldPassword: "",
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                mobile: userData.mobile || "",
                desc: userData.desc || "",
                profilePicture: userData.link || null,
                newPassword: "",
                confirmPassword: "",
                oldPassword: "",
            });
        }
    }, [userData]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value,
        });

    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePicture: file });
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        resetError();
        const storedFormData = {
            mobile: formData.mobile,
            link: typeof formData.profilePicture === "string" ? formData.profilePicture : "",
            desc: formData.desc,
        }

        // resetError();
        event.preventDefault();
        const user = await getUser();
        const { newPassword, confirmPassword, oldPassword, mobile, profilePicture, desc } = formData;

        // if new password is not empty (user trying to change passwords)
        if (newPassword !== "") {
            if (newPassword !== confirmPassword) {
                setShowError(true);
                setErrorMessage("New and Confirm Password do not match!");
                setNotMatchError(true);
                return;
            }

            if (oldPassword === "") {
                setoldPasswordNotEntered(true);
                setShowError(true);
                setErrorMessage("Please enter your old password.");
                return;
            }

            let credential = null;
            credential = EmailAuthProvider.credential(userData?.email!, oldPassword)  // wraps up what you type in the format that can be taken in reauthenticateWithCredentials from fireStore

            try {
                await reauthenticateWithCredential(user, credential)
                await setNewPassword(newPassword)
                setEdit(true);
            } catch (error) {
                setShowError(true);
                setIncorrectOldPassword(true);
                setErrorMessage("Password is incorrect!");
            }
        }
        //check for other conditions
        if (profilePicture) {
            if (typeof profilePicture === "string") { }
            else {
                await addStorage(formData.profilePicture, user.uid).then(res => {
                    storedFormData.link = res.link;
                });
                // setEdit(true);
            }
        }
        if (mobile !== "" && mobile !== userData!.mobile){
                if (!mobileRegix.test(mobile)) {
                    setShowError(true);
                    setMobileInvalid(true);
                    // setErrorMessage("Invalid mobile number. Please enter a valid number with a country code") //message for regix with country code
                    setErrorMessage("Invalid mobile number, Please enter a valid number"); // message for regix without country code
                    return;
                }
                // setEdit(true);
        }

        // if (desc !== "" && desc !== userData!.desc) {
        //         setEdit(true);
        // }

        try {
            await updateData("users", user.uid, storedFormData);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                window.location.reload(); // Reload the page after successful update
            }, 1000);
        } catch (error) {
            console.error("Error updating user data:", error);
            // Handle error updating user data
        }
};



const resetError = () => {
    setNotMatchError(false);
    setoldPasswordNotEntered(false);
    setMobileInvalid(false)
    setIncorrectOldPassword(false);
    setShowError(false);
    // setEdit(false)
}
const goback = () => {
    window.open("/", "_self")
}

return (
    <div>
        {showSuccess && (
            <Slide direction="top" in={showSuccess} style={{ zIndex: 300 }}>
                <Alert status='success' variant='solid' zIndex={300}>
                    <AlertIcon />
                    Data edited and uploaded successfully!
                </Alert>
            </Slide>
        )}
        {/* tried to make an alert come out if the user didnt enter anything, but it messed up the function of onsubmit , so till we find a solution we are not using it  */}
        {/* {!edit && (
            <Slide direction="top" in={warning} style={{ zIndex: 300 }}>
                <Alert status='warning' variant='solid' zIndex={300}>
                    <AlertIcon />
                    Nothing was edited!
                </Alert>
            </Slide>
        )} */}
        <NavBar />
        <div className="form-container">
            <div className="p-20 h-screen">
                <div className="max-w-[600px] mt-20 max-sm:mt-10" style={{}}>
                    <h1 className="text-4xl sm:text-4xl mb-8" style={{ fontFamily: 'SF-Pro-Display-Bold' }}>
                        Edit Your Profile!
                    </h1>
                    <form className="" onSubmit={handleSubmit}>
                        {/* profile picture */}
                        <Text fontFamily={"SF-Pro-Display-Bold"} mb={2}> Change your profile picture:</Text>
                        <FormControl mb={10}>
                            <label htmlFor="profile-picture" className="cursor-pointer">
                                <Avatar
                                    size="lg"
                                    src={formData.profilePicture ? typeof formData.profilePicture === "string" ? `${formData.profilePicture}` : URL.createObjectURL(formData.profilePicture) : "src/assets/add-profile-picture-white@2x.png"}
                                    borderRadius="full"
                                    boxShadow="lg"
                                    cursor="pointer"
                                />
                                <Input
                                    type="file"
                                    id="profile-picture"
                                    name="profilePicture"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    display="none" // Hide the file input visually
                                    position="absolute" // Position it absolutely to cover the avatar
                                    opacity={0} // Make it transparent
                                    zIndex={-1} // Move it behind the avatar
                                />
                            </label>
                        </FormControl>

                        {/* phone number */}
                        <Text fontFamily={"SF-Pro-Display-Bold"}>Change your mobile number:</Text>
                        <FormControl isInvalid={showError && mobileInvalid}>
                            <Input
                                type="tel"
                                id="mobile"
                                value={formData.mobile}
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
                            <FormErrorMessage mb={4} fontFamily={"SF-Pro-Text-Medium"}>{errorMessage}</FormErrorMessage>
                        </FormControl>

                        {/* Description for each user */}
                        <Text fontFamily={'SF-Pro-Display-Bold'} mb={2}>Description: </Text>
                        <FormControl mb={10}>
                            <Textarea
                                id="desc"
                                name="Description"
                                value={formData.desc}
                                onChange={handleChange}
                                placeholder="Describe yourself"
                                w={'80%'}
                                h={'30vh'}
                                boxSizing="border-box"
                                flexWrap={"wrap"}
                                flex={"flexbox"}
                            />
                        </FormControl>

                        {/* Changing Password */}
                        <Text fontFamily={'SF-Pro-Display-Bold'} mb={2}>Change your password: </Text>
                        <FormControl isInvalid={showError && notMatchError}>
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
                            <FormErrorMessage mb={4} fontFamily={"SF-Pro-Text-Medium"}>{errorMessage}</FormErrorMessage>
                        </FormControl>
                        {/* message for missmatch in new password */}


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
                            <FormErrorMessage mb={4} fontFamily={"SF-Pro-Text-Medium"}>{errorMessage}</FormErrorMessage>
                        </FormControl>
                        {/* //button divs */}
                        <div className="flex flex-nowrap">
                            <div className="pt-8 flex flex-nowrap items-center gap-4 flex-col">
                                <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                                    <button style={{
                                        background: 'transparent',
                                        padding: '8px',
                                        width: '120px',
                                        fontSize: '16px',
                                        border: '2px solid #fff',
                                        borderRadius: '20px',
                                        color: '#fff',
                                        textAlign: 'center',
                                        fontFamily: 'SF-Pro-Display-Bold',
                                    }} onClick={goback}>
                                        Cancel
                                    </button>
                                    <button className="defaultButton ml-2" style={{
                                        fontSize: '16px',
                                        fontFamily: 'SF-Pro-Display-Bold',
                                        width: '155px',
                                        height: '35px',
                                    }}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="bottom-0 w-80 h-auto right-[-2vh] p-4 fixed max-sm:w-[45%] " >
                        <img src="src/assets/bg-triangle-ellipse@2x.png" alt="Triangle" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};