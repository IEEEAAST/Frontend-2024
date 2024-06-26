import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import HeadVolunteer from '../../interfaces/HeadVolunteer.tsx';

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const VolunteersCarousel = ({ volunteers }: { volunteers: HeadVolunteer[] }) => {
  const [volunteerIndex, setVolunteerIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setVolunteerIndex((prevIndex) => (prevIndex === volunteers.length - 1 ? 0 : prevIndex + 1));
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && volunteerIndex < volunteers.length - 1) {
      setVolunteerIndex((prevIndex) => prevIndex + 1);
    } else if (x >= DRAG_BUFFER && volunteerIndex > 0) {
      setVolunteerIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl h-full">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${volunteerIndex * 32}%` }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Volunteers
          volunteerIndex={volunteerIndex}
          volunteers={volunteers}
        />
      </motion.div>
    </div>
  );
};

const Volunteers = ({ volunteerIndex, volunteers }: { volunteerIndex: number; volunteers: HeadVolunteer[] }) => {
  return (
    <>
      {volunteers.map((volunteer, idx) => {
        const isSelected = volunteerIndex === idx;
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${volunteer.photo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{ scale: isSelected ? 0.95 : 0.85 }}
            transition={SPRING_OPTIONS}
            className={`aspect-video shrink-0 rounded-xl object-cover grayscale h-96 w-[350px] ${isSelected ? "filter-none" : ""}`}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white py-2 px-4">
              <p className="text-3xl font-semibold">{volunteer.name}</p>
              <p className="text-sm">{volunteer.role}</p>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};
