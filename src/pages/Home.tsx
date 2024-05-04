import { NavBar } from "../components/common/navbar.tsx";
import About from "../components/Home/About.tsx";
import { AchievementCarousel } from "../components/Home/AchievementCarousel.tsx";
import { HomeComp } from "../components/Home/home.tsx";
import { Sponsor } from "../components/Home/Sponsor.tsx";
import { Volunteers } from "../components/Home/Volunteers.tsx";
export const Home = () => {
  return (
    <>
      <NavBar />
      <HomeComp />
      <Sponsor />
      <About/>
      <AchievementCarousel/>
      <Volunteers/>
    </>
  );
};
