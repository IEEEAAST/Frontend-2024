import { NavBar } from "../components/common/navbar.tsx";
import { MailDesign } from "./MailDesign.tsx";
import { Onboarding } from "./Onboarding.tsx";

import { Link } from "react-router-dom";

// import { Test } from "../components/Home/Test.tsx";
export const Home = () => {
  return (
    <div>
      <NavBar />
      <MailDesign />
      <div className="flex fixed top-60 w-80 h-auto  p-4">
        {/* Button 1 navigates to '/page1' */}
        <Link to="/mail2">
          <button className="bg-transparent py-2 px-4 w-28   border-2 border-white rounded-full">
            TEST 2
          </button>
        </Link>
        <Link to="/onboard">
          <button className="bg-transparent py-2 px-4 w-28   border-2 border-white rounded-full">
            TEST 3
          </button>
        </Link>
        <Link to="/verify">
          <button className="bg-transparent py-2 px-4 w-28   border-2 border-white rounded-full">
            TEST 4
          </button>
        </Link>
        <Link to="/Signup">
          <button className="bg-transparent py-2 px-4 w-28   border-2 border-white rounded-full">
            TEST 5
          </button>
        </Link>
      </div>
      {/* Added Route for MailDesign */}
    </div>
  );
};
