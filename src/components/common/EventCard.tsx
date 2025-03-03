import { Link } from 'react-router-dom';
import { EventData } from '../../interfaces/EventData';
import { motion, useAnimation } from "framer-motion";
import firebase from 'firebase/compat/app';

interface EventCardProps {
    event: EventData;
    color?: string | undefined;
    className?: string;
}

export const EventCard = ({ event, color, className }: EventCardProps) => {
    const colors = {
        red:"#b83232",
        blue:"#588CD3",
        green:"#81AA34",
        magenta:"#C058D3",
        yellow:"#e8d36b",
        brown:"#4f3b29",
        turquoise:"#58D3C0",
        orange:"#eb9131",
        pink:"#ffa1f2",
        grey:"#A3A3A3"
    }

    const autoColorByTopic = (topic: string) => {
        const topicColors: { [key: string]: string } = {
            Other: "brown",
            Technical: "grey",
            AI: "magenta",
            Python: "yellow",
            Web: "turquoise",
            Mobile: "orange",
            Database: "pink",
            Security: "green",
            Media: "blue",
            Game: "red"
        };
        return topicColors[topic] || "#000000"; // Default to black if topic not found
    };

    const controls = useAnimation();
    const handleMouseEnter = () => {
        if(window.innerWidth > 640)
        controls.start({ rotateY: 180 });
        else
        controls.start({ rotateY: 0 });
    };

    const handleMouseLeave = () => {
        controls.start({ rotateY: 0 });
    };

    const formatDate = (date: firebase.firestore.Timestamp) => {   //date changed to DD/MM/YY format as mentioned in figma design
        const d = new Date(date.toDate());
        const day = d.getDate(); 
        const month = d.getMonth() + 1; 
        const year = d.getFullYear(); 
      
        return `${day}/${month}/${year}`;
      };
      const content =             <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
  >
      <motion.div
          style={{ 
              backgroundRepeat: 'no-repeat', 
              backgroundPosition: 'right', 
              backgroundColor: colors[color as keyof typeof colors] || colors[autoColorByTopic(event.type) as keyof typeof colors],
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s'
          }}
          className={`${'w-full h-[65px] bg-cardSmall bg-contain lg:w-[255px] lg:h-[330px] xl:h-[24.5vw] xl:w-[20vw] md:w-[218px] md:h-[275px] sm:h-[260px] sm:w-[200px] sm:bg-cardLarge sm:bg-cover'} rounded-[10px] md:rounded-[9px]`}
          animate={controls}
      >
          <motion.div
              className={`absolute w-full h-full backface-hidden px-[15px] ${'pt-[4px] sm:pt-[150px] md:pt-[160px] lg:pt-[190px] xl:pt-[13vw] xl:px-10'} flex flex-col sm:justify-between`}
              style={{ backfaceVisibility: 'hidden' }}
          >
              <h3 className={`font-bold w-full text-center ${'text-[23px] sm:text-[18px] md:text-[20px] lg:text-[23px] xl:text-[2vw] sm:flex sm:justify-center'}`}>{event.title}</h3>
              <div className='flex gap-1 sm:self-center sm:flex-col sm:py-1'>
                  <p className={`${'font-thin text-[14px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[17px] sm:flex sm:justify-center'}`}>
                      {event.type}<span className='sm:hidden'> •</span>
                  </p>
                  <p className={`${' font-thin text-[14px] sm:text-[13px]  xl:text-[1vw]'} opacity-80`}>
                      {formatDate(event.starttime)} - {formatDate(event.endtime)}
                  </p>
              </div>
          </motion.div>
          <motion.div
              className="absolute w-full h-full backface-hidden rounded-[20px] md:rounded-[9px]"
              style={{ 
                  backfaceVisibility: 'hidden', 
                  transform: 'rotateY(180deg)', 
                  backgroundImage: `url(${event.coverPhoto})`, 
                  backgroundSize: 'cover', 
                  backgroundRepeat: 'no-repeat', 
                  backgroundPosition: 'center' 
              }}
          />
          <div className='bg-[rgba(0,0,0,0.8)] w-full' style={{backfaceVisibility: 'hidden',transform: 'rotateY(180deg)'}}><p className={`font-bold ${'text-lg flex justify-center'}`}>{event.title}</p></div>
      </motion.div>
  </div>

    return (
        <Link to={`/event/${event.title}`} className={className}>
            {content}
        </Link>
    );
};