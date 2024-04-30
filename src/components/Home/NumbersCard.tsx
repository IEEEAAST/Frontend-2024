import React from "react";
import "./styles/Card.css";
import "./styles/NumbersCard.css";

interface NumbersCardProps {
  title: string;
  text: string;
  imgSrc: string;
}

const NumbersCard: React.FC<NumbersCardProps> = ({ title, text, imgSrc }) => {
  return (
    <div className="box">
      <img src={imgSrc} alt={title} />
      <div className="content">
        <h2 className="box-title">{title}</h2>
        <p className="box-text">{text}</p>
      </div>
    </div>
  );
};

export default NumbersCard;
