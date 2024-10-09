import { Link } from 'react-router-dom';
import { EventData } from '../../interfaces/EventData';
import Card from '../../assets/card.png';
import { motion, useAnimation } from "framer-motion";
import { useState } from 'react';

interface EventCardProps {
    event: EventData;
    size: 'sm' | 'lg';
    color?: string | undefined;
    className?: string;
}

export const EventCard = ({ event, size, color, className }: EventCardProps) => {
    const isLarge = size === 'lg';
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
            Technical: "red",
            AI: "magenta",
            Python: "yellow",
            Web: "turquoise",
            Mobile: "orange",
            Database: "pink",
            Security: "green",
            Media: "blue",
            Game: "grey"
        };
        return topicColors[topic] || "#000000"; // Default to black if topic not found
    };

    const controls = useAnimation();
    const [isFlipped, setIsFlipped] = useState(false);

    const handleMouseEnter = () => {
        setIsFlipped(true);
        controls.start({ rotateY: 180 });
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
        controls.start({ rotateY: 0 });
    };

    return (
        <Link to={`/event/${event.title}`} className={className+"flex items-center justify-center"}>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: 1000 }}
            >
                <motion.div
                    style={{ 
                        backgroundImage: `url(${Card})`, 
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundPosition: 'center', 
                        backgroundColor: colors[color as keyof typeof colors] || colors[autoColorByTopic(event.type) as keyof typeof colors],
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.1s',
                        width: isLarge ? '25vw' : '250px',
                        height: isLarge ? 'calc(25vw * 1.25)' : '310px' // Maintain aspect ratio of 1.25
                    }}
                    className={`${isLarge ? '' : 'w-[250px] h-[310px]'} rounded-[9px] flex flex-col items-center text-center justify-between relative`}
                    animate={controls}
                >
                    <motion.div
                        className={`absolute w-full h-full backface-hidden px-[4vw] ${isLarge?'pt-[calc(23vw*0.675)]':'pt-[160px]'} flex flex-col justify-between`}
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <h3 className={`font-bold w-full ${isLarge ? 'text-[3vw] lg:text-[3vw]' : 'text-[24px]'}`}>{event.title}</h3>
                        <div className='flex flex-col py-1'>
                            <p className={`${isLarge ? 'text-[1.5vw]' : 'text-[14px]'}`}>
                                {event.type}
                            </p>
                            <p className={`${isLarge ? 'text-[1.2vw]' : 'text-[12px]'} opacity-50`}>
                                {new Date(event.starttime.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="absolute w-full h-full backface-hidden rounded-[9px]"
                        style={{ 
                            backfaceVisibility: 'hidden', 
                            transform: 'rotateY(180deg)', 
                            backgroundImage: `url(${event.coverPhoto})`, 
                            backgroundSize: 'cover', 
                            backgroundRepeat: 'no-repeat', 
                            backgroundPosition: 'center' 
                        }}
                    />
                    <div className='bg-[rgba(0,0,0,0.8)] w-full' style={{backfaceVisibility: 'hidden',transform: 'rotateY(180deg)'}}><p className={`font-bold ${isLarge?'text-[2vw]':'text-lg'}`}>{event.title}</p></div>
                </motion.div>
            </div>
        </Link>
    );
};