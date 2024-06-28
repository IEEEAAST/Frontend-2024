import { useEffect, useRef, useState } from 'react';
import getCollection from '../../firebase/getCollection.js';
import { Spinner } from '@chakra-ui/react';
import SponsorData from '../../interfaces/Sponsor.tsx';

export const Sponsor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sponsors, setSponsors] = useState<SponsorData[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const container = containerRef.current;

    getCollection('sponsors').then((response) => {
      if(response.result){
      setSponsors(response.result);
      setLoading(false);
      console.log(response.result);
    }
    });

    if (container) {
      const handleWheelScroll = (event: WheelEvent) => {
        const delta = Math.sign(event.deltaY);

        const canScrollHorizontally = container.scrollWidth > container.clientWidth;

        if (canScrollHorizontally) {
          container.scrollLeft += delta * 30;
          event.preventDefault();
        }
      };

      container.addEventListener('wheel', handleWheelScroll);

      return () => {
        container.removeEventListener('wheel', handleWheelScroll);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center gap-12 border-4 border-y-blue-950/55 w-full border-x-transparent h-40 overflow-x-scroll overflow-y-hidden customScrollbar"
    >
      {loading? <Spinner size="xl" />:sponsors.map((sponsor, idx) => (
        <img key={idx} src={sponsor.imgurl} alt={sponsor.name} className="h-20" />
      ))}
      
    </div>
  );
};
