import { NavBar } from "../components/common/navbar.tsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Input, FormControl, FormLabel } from "@chakra-ui/react";
export const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateEmail(formData.email) && validatePassword(formData.password)) {
      console.log(formData);
    } else {
      alert("Please enter a valid email and password (at least 6 characters)");
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  return (
    <div className="form-container">
      <NavBar />

      <div className="flex flex-col justify-center p-16 h-screen">
        <div className="max-w-[600px] ">
          <h1 className="primary-heading text-4xl sm:text-6xl pb-2">
            Let's get to know each other
          </h1>
          <p className="pt-4 pb-8 text-left   ">
            Tell us who you are. We will send you an email to verify it's you ;)
          </p>

          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                id="firstName"
                name="Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />{" "}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                id="lastName"
                name="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />{" "}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Your Email</FormLabel>
              <Input
                type="email"
                id="email"
                name="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />{" "}
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />{" "}
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
                Cancel
              </button>
            </Link>
            {/* Button 2 navigates to '/page2' */}
            <Link to="/verify">
              <button className="bg-white text-black text-sm font-bold py-2 px-4 w-36 border-2 border-white rounded-full m-2 ">
                Send Email
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
