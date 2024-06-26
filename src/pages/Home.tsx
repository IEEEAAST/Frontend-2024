import { NavBar } from "../components/common/navbar.tsx";
import { AboutUs } from "../components/Home/About-us.tsx";
import About from "../components/Home/About.tsx";
import { AchievementCarousel } from "../components/Home/AchievementCarousel.tsx";
import { HomeComp } from "../components/Home/home.tsx";
import { Joinus } from "../components/Home/Join-us.tsx";
import { Sponsor } from "../components/Home/Sponsor.tsx";
import { Volunteers } from "../components/Home/Volunteers.tsx";
import Footer from "../components/common/Footer.tsx";
import EventHighlights from "../components/Home/EventHighlights.tsx";
export const Home = () => {
  return (
    <>
      <NavBar />
      <HomeComp />
      <Sponsor />
      <About/>
      <AchievementCarousel/>
      <EventHighlights/>
      <Volunteers/>
      <AboutUs/>
      <Joinus/>
      <Footer/>
    </>
  );
};
