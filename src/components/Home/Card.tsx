import React from "react";
import "./styles/Card.css";

interface CardProps {
  title: string;
  text: string;
  imgSrc: string;
  width: string;
  backGround: string;
}

const Card: React.FC<CardProps> = ({
  title,
  text,
  imgSrc,
  width,
  backGround,
}) => {
  let w;
  if (width === "small") {
    w = "350px";
  } else {
    w = "550px";
  }
  return (
    <div
      className="card"
      style={{
        width: `${w}`,
        background: `${backGround} url(${imgSrc}) no-repeat`,
        backgroundSize: "contain",
        backgroundPosition: "right",
      }}
    >
      <div className="content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

export default Card;
