import { NavBar } from "../components/common/navbar.tsx";
import { HomeComp } from "../components/Home/home.tsx";
// import { Test } from "../components/Home/Test.tsx";
export const Home = () => {
  return (
    <div>
      <NavBar />
      <HomeComp />
      <p>helloz</p>
    </div>
  );
};
