import Logo from "../../../assets/IEEELogoWhite.png";
import "./styles/Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={Logo} alt="IEEE Logo" />
          </div>
          <div className="footer-line"></div>
      <div className="footer-links">
        <ul>
          <li><a href="">Help</a></li>
          <li><a href="">Privacy</a></li>
          <li><a href="">Team</a></li>
          <li><a href="">Volunteering</a></li>
          <li><a href="">Teams</a></li>
          <li><a href="">About</a></li>
        </ul>
      </div>
    </div>
  );
};
