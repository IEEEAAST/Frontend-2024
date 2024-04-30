import React from "react";
import Card from "../components/Home/Card";
import "../components/Home/styles/Card.css";

import Growth from "../assets/growth-arrow-green.png";
import Integrity from "../assets/integrity-scales-yellow.png";
import PartnerShip from "../assets/partner-hands-orange.png";
import Service from "../assets/service-chip-flamenco.png";
import Trust from "../assets/trust-net-blue.png";
import Community from "../assets/community-globe-purple.png";

const Home: React.FC = () => {
  const cardsData = [
    {
      title: "Growth",
      text: "Promote ongoing education for engineers, scientists, and technologists and maintain a student pipeline to sustain the profession.",
      imgSrc: Growth,
      width: "small",
      backGround: "#E2ECD7",
    },
    {
      title: "Global Community Building",
      text: "Cultivating active, vibrant, and honest exchange among cross-disciplinary and interdisciplinary global communities of technical professionals.",
      imgSrc: Community,
      width: "big",
      backGround: "#E5DEEC",
    },
    {
      title: "Trust",
      text: "Being a trusted and unbiased source of technical information, and forums, for technical dialog and collaboration.",
      imgSrc: Trust,
      width: "big",
      backGround: "#D3E4F5",
    },
    {
      title: "Partnership",
      text: "Cultivate a culture that values contributions, empowers individuals, and strengthens the volunteer-staff partnership for professional service.",
      imgSrc: PartnerShip,
      width: "small",
      backGround: "#F6E6D3",
    },
    {
      title: "Service to humanity",
      text: "Leveraging science, technology, and engineering to benefit human welfare; promoting public awareness and understanding of engineering",
      imgSrc: Service,
      width: "small",
      backGround: "#F5D3D3",
    },
    {
      title: "Integrity in action",
      text: "Fostering a professional climate in which engineers and scientists continue to be respected for their exemplary ethical behaviour and volunteerism.",
      imgSrc: Integrity,
      width: "big",
      backGround: "#F5EFD7",
    },
  ];

  return (
    <>
      <div className="card-container">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            text={card.text}
            imgSrc={card.imgSrc}
            width={card.width}
            backGround={card.backGround}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
