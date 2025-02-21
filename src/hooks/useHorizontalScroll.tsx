import { useEffect } from 'react';

const useHorizontalScroll = (containerRef: React.MutableRefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleWheelScroll = (event: WheelEvent) => {
        const delta = Math.sign(event.deltaY);

        // Check if the content inside the container exceeds its visible area
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
  }, [containerRef]);
};

export default useHorizontalScroll;
