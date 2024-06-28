import { NavBar } from "../components/common/navbar.tsx";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

export const Onboarding = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log(formData);
  };
  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center p-16 h-screen">
        <div className="max-w-[600px] ">
          <h1 className="text-4xl sm:text-6xl pb-2">Hey,</h1>
          <p className="pt-4 pb-8 text-left   ">
            Welcome aboard... now you can finish setting up your profile <br />
            Or you can do it later from your profile tab ;)
          </p>
          <Avatar
            size="sm" // Adjust the size as needed
            // name="add"
            // src="assets/add-profile-picture-white.png" // URL of your picture
            src="src/assets/add-profile-picture-white@2x.png"
            borderRadius="full" // Makes the avatar circular
            boxShadow="lg" // Adds a shadow effect for depth
          />
          <form onSubmit={handleSubmit}>
            <FormControl className="pt-4">
              <FormLabel>Mobile Number</FormLabel>
              <Input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
          </form>

          {/* <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="mobile">Mobile Number:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
          </form> */}
          <div className="pt-8">
            {/* Button 1 navigates to '/page1' */}
            <Link to="/page1">
              <button className="bg-transparent py-2 px-4 w-28   border-2 border-white rounded-full">
                Later
              </button>
            </Link>
            {/* Button 2 navigates to '/page2' */}
            <Link to="/Signup">
              <button className="bg-white text-black text-sm font-bold py-2 px-8 w-36 border-2 border-white rounded-full m-2 ">
                Finish
              </button>
            </Link>
          </div>
          <div className="fixed bottom-0 w-80 h-auto right-0 p-4">
            <img src="src\assets\bg-triangle-ellipse@2x.png" alt="Triangle" />
          </div>
        </div>
      </div>
    </div>
  );
};
