import { NavBar } from "../components/common/navbar.tsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";

//empty strings to be filled by the user
export const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
//updating the component's state whenever there is a change in the input fields
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  //validation check after submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateEmail(formData.email) && validatePassword(formData.password)) {
      console.log(formData); //console log is added temporarily until we create a database that will store the user's info

    } else {
      alert("Please enter a valid email and password (at least 6 characters)");
    }
  };

  //email check
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  //password check
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  
//Headings
//components prompting inputs
//2 bottom buttons
  return (
    <div className="form-container">
      <NavBar />

      <div className="flex flex-col justify-center p-16 h-screen">
        <div className="max-w-[600px] ">
          <h1 className="primary-heading pb-2">
            Let's get to know each other
          </h1>
          <p className="pt-4 pb-8 text-left secondary-heading">
            Tell us who you are. We will send you an email to verify it's you ;)
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <FormControl mb={4}>
              <Input
                className="input-field"
                placeholder="First name"
                type="text"
                id="firstName"
                name="Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <Input
                className="input-field"
                placeholder="Last name"
                type="text"
                id="lastName"
                name="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <Input
                className="input-field"
                placeholder="Your Email"
                type="email"
                id="email"
                name="Your Email"
                value={formData.email}
                onChange={handleChange}
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                required
              />
            </FormControl>

            <FormControl>
              <Input
                className="input-field"
                placeholder="Password"
                type="password"
                id="password"
                name="Password"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
              />
            </FormControl>

            <div className="pt-8 bottom-buttons">
              <Link to="/page1">
                <button id="cancel">Cancel</button>
              </Link>
              <button type="submit" id="email-sender">Send Email</button>
            </div>
            <div className="fixed bottom-0 w-80 h-auto right-0 p-4">
              <img src="src\assets\bg-triangle-ellipse@2x.png" alt="Triangle" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
