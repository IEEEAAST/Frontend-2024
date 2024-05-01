import { NavBar } from "../components/common/navbar.tsx";
import { HomeComp } from "../components/Home/home.tsx";
import { Sponsor } from "../components/Home/Sponsor.tsx";
// import { Test } from "../components/Home/Test.tsx";
export const Home = () => {
  return (
    <div>
      <NavBar />
      <HomeComp />
      <Sponsor />
    </div>
  );
};
