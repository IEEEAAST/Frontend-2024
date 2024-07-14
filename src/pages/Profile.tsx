import { NavBar } from "../components/common/navbar";
import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Input, FormControl, FormLabel, FormErrorMessage, Button, Text, flexbox, Textarea, Avatar } from "@chakra-ui/react";
import { wrap } from "module";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    desc: string;
    profilePicture: File | null;
}


export const Profile = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        desc: "",
        profilePicture: null,
    });
    const [showError, setShowError] = useState(false);

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
        event.preventDefault();

        if (!isErrorEmail && !isErrorPass) {
            setShowError(false);
        } else {
            setShowError(true);
        }
    };

    const goback = () => {
        window.open("/", "_self")
    }


    const isErrorEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) === (false);
    const isErrorPass = formData.password.length < 6;

    return (
        <div>
            <NavBar />
            <div className="form-container">
                <div className="p-20 h-screen">
                    <div className="max-w-[600px] mt-20 max-sm:mt-10" style={{}}>
                        <h1 className="text-4xl sm:text-4xl mb-8" style={{ fontWeight: 'bold' }}>
                            Edit Your Profile!
                        </h1>
                        <form className="" onSubmit={handleSubmit}>


                            <Text fontFamily={"SF-Pro-Text-Medium"} mb={2}> Change your profile picture:</Text>
                            <FormControl mb={10}>
                                <label htmlFor="profile-picture" className="cursor-pointer">
                                    <Avatar
                                        size="lg"
                                        src={formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : "src/assets/add-profile-picture-white@2x.png"}
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

                            <Text fontFamily={'SF-Pro-Text-Medium'} mb={2}>Description: </Text>
                            <FormControl mb={10} isInvalid={isErrorEmail && showError}>
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
                            <Text fontFamily={'SF-Pro-Text-Medium'} mb={2}>Change your password: </Text>
                            <FormControl isInvalid={isErrorPass && showError}>
                                <Input
                                    type="password"
                                    id="newpassword"
                                    name="Password"
                                    onChange={handleChange}
                                    required
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
                                    required
                                    placeholder="Confirm New Password"
                                    style={{
                                        width: '80%',
                                        border: 'none',
                                        borderBottom: '1px solid rgb(4, 4, 62)',
                                        outline: 'none',
                                    }}
                                />
                                <Input
                                    type="password"
                                    id="oldPassword"
                                    name="oldPassword"
                                    onChange={handleChange}
                                    required
                                    placeholder="Old Password"
                                    style={{
                                        width: '80%',
                                        border: 'none',
                                        borderBottom: '1px solid rgb(4, 4, 62)',
                                        outline: 'none',
                                    }}
                                />
                            </FormControl>

                            {/* //button divs */}
                            <div className="flex flex-nowrap">
                                <div className="pt-8 flex flex-nowrap items-center gap-4 flex-col">
                                    <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                                        <button style={{
                                            background: 'transparent',
                                            padding: '8px',
                                            width: '120px',
                                            fontSize: '11px',
                                            border: '2px solid #fff',
                                            borderRadius: '20px',
                                            color: '#fff',
                                            textAlign: 'center',
                                        }} onClick={goback}>
                                            Cancel
                                        </button>
                                        <button className="defaultButton ml-2" style={{
                                            fontSize: '11px',
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