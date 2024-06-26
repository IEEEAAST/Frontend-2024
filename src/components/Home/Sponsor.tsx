import logo from "../../assets/IEEELogoWhite.png";
import { useEffect, useRef } from 'react';

export const Sponsor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

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
      <img src={logo} alt="logo" width="120" />
      <img src={logo} alt="logo" width="120" />
      <img src={logo} alt="logo" width="120" />
      <img src={logo} alt="logo" width="120" />
      <img src={logo} alt="logo" width="120" />
      <img src={logo} alt="logo" width="120" />
    </div>
  );
};
