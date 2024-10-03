import { useEffect, useRef, useState } from "react";
import getCollection from "../../firebase/getCollection.js";
import { Spinner } from "@chakra-ui/react";
import SponsorData from "../../interfaces/Sponsor.tsx";

export const Sponsor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sponsors, setSponsors] = useState<SponsorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;

    getCollection("sponsors").then((response) => {
      if (response.result) {
        console.log(response.result);
        setSponsors([...response.result, ...response.result]);
        setLoading(false);
      }
    });

    let scrollInterval: NodeJS.Timeout | null = null;
    if (container) {
      const scrollSpeed = 1; // Adjust scroll speed as needed
      const scrollDelay = 15; // Delay between each scroll update in ms

      const startScrolling = () => {
        scrollInterval = setInterval(() => {
          container.scrollLeft += scrollSpeed;

          if (container.scrollLeft >= container.scrollWidth / 2) {
            setSponsors((prevSponsors) => [...prevSponsors, ...prevSponsors]); // Readds the images, so it looks like its infinitely scrolling
          }
        }, scrollDelay);
      };

      const stopScrolling = () => {
        if (scrollInterval) {
          clearInterval(scrollInterval);
          scrollInterval = null;
        }
      };

      startScrolling(); // Start scrolling initially

      return () => {
        stopScrolling(); // Clean up interval
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center gap-12 border-4 border-y-blue-950/55 w-full border-x-transparent h-40 overflow-hidden customScrollbar"
      style={{ overflowX: "hidden", whiteSpace: "nowrap" }}
    >
      {loading ? (
        <Spinner size="xl" />
      ) : (
        sponsors.map((sponsor, idx) => (
          <img
            key={idx}
            src={sponsor.imgurl}
            alt={sponsor.name}
            className="h-20 mx-4"
          />
        ))
      )}
    </div>
  );
};