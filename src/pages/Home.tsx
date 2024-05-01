import { NavBar } from "../components/common/navbar.tsx";
import About from "../components/Home/About.tsx";
import { HomeComp } from "../components/Home/home.tsx";
import { Sponsor } from "../components/Home/Sponsor.tsx";
export const Home = () => {
  return (
    <>
      <NavBar />
      <HomeComp />
      <Sponsor />
      <About/>
    </>
  );
};
