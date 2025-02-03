import { useEffect, useRef, useState } from "react";
import Trophy from "../../assets/carousel-award.jpg";
import Arrow from "../../assets/carousel-arrow.jpg";
import getCollection from "../../firebase/getCollection";
import Award from "../../interfaces/Award";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./styles/SwipeCarousel.css";

export const SwipeCarousel = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    getCollection("awards").then((response) => {
      if (response.result) {
        const sortedAwards = response.result.sort(
          (a: Award, b: Award) => a.year - b.year
        );
        setAwards(sortedAwards);
      }
    });
  }, []);

  return (
    <div className="relative rounded-2xl h-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        style={{ height: "400px", width: "550px" }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {awards.map((award, idx) => (
          <SwiperSlide key={idx} className="swiper-slide">
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-white border-2 border-purple-400 rounded-lg swirly-background">
              <div className="text-[20px] font-semibold text-center text-black mt-4 w-[350px] min-h-[60px]">
                {award.name}
              </div>
              <div className="w-48 h-48 flex items-center justify-center mt-14 mb-8">
                <img
                  src={Trophy}
                  className="w-full h-full object-contain"
                  alt="Trophy"
                />
              </div>
              <div className="absolute bottom-4 right-4 text-4xl font-bold text-[#5D17EB]">
                {award.year}
              </div>
              <img
                src={Arrow}
                className="absolute right-0 top-1.5/3 transform -translate-y-1/2 w-24 h-19 cursor-pointer"
                alt="Arrow"
                onClick={() => swiperRef.current?.slideNext()}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
