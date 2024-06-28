import { NavBar } from "../components/common/navbar";
import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD

import { Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
=======
import { Input, FormControl, FormLabel } from "@chakra-ui/react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

>>>>>>> fa27352cf2bedc00d2764ca02a2bfa859ee71da4
export const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isErrorEmail && !isErrorPass) {
      console.log(formData);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

<<<<<<< HEAD

  const isErrorEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) === (false);
  const isErrorPass =  formData.password.length < 6;

  // const validateEmail = (email) => {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // };

  // const validatePassword = (password) => {
  //   return password.length >= 6;
  // };
=======
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };
>>>>>>> fa27352cf2bedc00d2764ca02a2bfa859ee71da4

  return (
    <div className="form-container">
      <NavBar />
      <div className="flex flex-col justify-center p-16 h-screen">
        <div className="max-w-[600px] ">
          <h1 className="primary-heading text-4xl sm:text-6xl pb-2">
            Let's get to know each other
          </h1>
          <p className="pt-4 pb-8 text-left">
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
<<<<<<< HEAD
                required                
              />{" "}
=======
                required
              />
>>>>>>> fa27352cf2bedc00d2764ca02a2bfa859ee71da4
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
              />
            </FormControl>
<<<<<<< HEAD

            <FormControl mb={4} isInvalid={isErrorEmail}>
=======
            <FormControl mb={4}>
>>>>>>> fa27352cf2bedc00d2764ca02a2bfa859ee71da4
              <FormLabel>Your Email</FormLabel>
              <Input
                type="email"
                id="email"
                name="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
<<<<<<< HEAD
               
              />
               {isErrorEmail? (
                <FormErrorMessage>Email is required.</FormErrorMessage>)  : (null)}
                {" "}
            </FormControl>

            <FormControl isInvalid={isErrorPass}>
=======
              />
            </FormControl>
            <FormControl>
>>>>>>> fa27352cf2bedc00d2764ca02a2bfa859ee71da4
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormControl>
          </form>
<<<<<<< HEAD

          

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

=======
>>>>>>> fa27352cf2bedc00d2764ca02a2bfa859ee71da4
          <div className="pt-8">
            <Link to="/page1">
              <button className="bg-transparent py-2 px-4 w-28 border-2 border-white rounded-full">
                Cancel
              </button>
            </Link>
<<<<<<< HEAD
            {/* Button 2 navigates to '/page2' */}
            {isValid?
=======
>>>>>>> fa27352cf2bedc00d2764ca02a2bfa859ee71da4
            <Link to="/verify">
              <button className="bg-white text-black text-sm font-bold py-2 px-4 w-36 border-2 border-white rounded-full m-2">
                Send Email
              </button>
            </Link>
            :<button className="bg-white text-black text-sm font-bold py-2 px-4 w-36 border-2 border-white rounded-full m-2 " onSubmit={handleSubmit}>
            Send Email
          </button> }
          </div>
          <div className="fixed bottom-0 w-80 h-auto right-0 p-4">
            <img src="src/assets/bg-triangle-ellipse@2x.png" alt="Triangle" />
          </div>
        </div>
      </div>
    </div>
  );
};
