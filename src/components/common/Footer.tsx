import FAQ from "../../assets/faq-bubble-white.png";
import Discord from "../../assets/discord-white.png";
import Twitter from "../../assets/twitter-white.png";
import Linkedin from "../../assets/linkedin-white.png";
import Contact from "../../assets/contact-envelope-white.png";
import Logo from "../../assets/IEEEAAST.ico";
import FooterSocialCard from "./FooterSocialCard";
import "./styles/Footer.css";

const SocialInfo = [
  {
    title: "Frequently Asked Questions",
    imgSrc: FAQ,
    link: "https://www.ieee.org/",
  },
  {
    title: "Twitter",
    imgSrc: Twitter,
    link: "https://www.ieee.org/",
  },
  {
    title: "Discord",
    imgSrc: Discord,
    link: "https://www.ieee.org/",
  },
  {
    title: "Contact Us",
    imgSrc: Contact,
    link: "https://www.ieee.org/",
  },
  {
    title: "LinkedIn",
    imgSrc: Linkedin,
    link: "https://www.ieee.org/",
  },
];

const Footer = () => {
  return (
    <footer className="footer-container">
      <h2 className="footer-heading">Leading with Passion.</h2>
      <div className="footer-social-links">
        {SocialInfo.map((social, index) => (
          <FooterSocialCard key={index} {...social} />
        ))}
      </div>
      <div className="footer-bottom">
        <a href="https://www.ieee.org/" target="_blank" rel="noreferrer">
          <img src={Logo} alt="IEEE logo" className="logo-img" />
        </a>
        <div className="policy-pages">
          <a href="#" className="footer-title">
            {" "}
            Cookie Preferences
          </a>
          <a href="#" className="footer-title">
            {" "}
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
