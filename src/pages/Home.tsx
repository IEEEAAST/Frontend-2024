import { NavBar } from "../components/common/navbar.tsx";
import { SignUp } from "../pages/Signup";
// import { Test } from "../components/Home/Test.tsx";
export const Home = () => {
  return (
    <div>
      <NavBar/>
      <SignUp />
      {/* <Test/> */}
    </div>
  );
};
