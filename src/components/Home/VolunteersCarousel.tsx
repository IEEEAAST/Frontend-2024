import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Add Pagination module
import "swiper/css";
import "swiper/css/pagination"; // Import pagination styles
import "./styles/SwipeCarousel.css";
import HeadVolunteer from "../../interfaces/HeadVolunteer";

export const VolunteersCarousel = ({ headVolunteers }: { headVolunteers: HeadVolunteer[] }) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [selectedSlide, setSelectedSlide] = useState<number | null>(0);

  const setCurrentWidth = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", setCurrentWidth);
    return () => window.removeEventListener("resize", setCurrentWidth);
  }, [])

  const handleSlideChange = (idx: number) => {
    setSelectedSlide(idx);
    const slides = document.querySelectorAll(".swiper-slide");
    slides.forEach((slide, index) => {
      if (index === idx) {
      slide.classList.add("selected-slide-animation");
      } else {
      slide.classList.remove("selected-slide-animation");
      }
    });
  }

  return (
    <div className="relative rounded-2xl h-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={width < 1024 && width >= 768? 10 : 30}
        slidesPerView={width >= 1024? 3 : width >= 768? 2 : 1}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        style={{ height: "400px" }}
      >
        {headVolunteers.map((volunteer, idx) => (
          <SwiperSlide
            key={idx}
            onClick={() => handleSlideChange(idx)}
            style={{
              backgroundImage: `url(${volunteer.photo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={`relative aspect-video shrink-0 rounded-xl object-cover grayscale h-64 md:h-80 lg:h-96 w-full md:w-[300px] lg:w-[350px] overflow-hidden ${selectedSlide === idx ? "filter-none" : "scale-95"}`}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white py-2 px-3 md:py-3 md:px-4">
              <p className="text-xl md:text-2xl font-semibold">{volunteer.name}</p>
              <p className="text-xs md:text-sm">{volunteer.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
