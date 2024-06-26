import Arrow from "../../assets/language-arrow-white.png";

interface FooterSocialCard {
  title: string;
  imgSrc: string;
  link: string;
}

const FooterSocialCard = ({ title, imgSrc, link }: FooterSocialCard) => {
  return (
    <div className="social-box">
      <div className="socialmedia">
        <a href={link} target="_blank" rel="noreferrer" className="social-icon">
          <img src={imgSrc} alt={title} />
        </a>
        <h4 className="social-title">{title}</h4>
      </div>
      <img src={Arrow} alt="arrow" />
    </div>
  );
};

export default FooterSocialCard;
