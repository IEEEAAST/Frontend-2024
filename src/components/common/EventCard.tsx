import React from 'react';
import { Link } from 'react-router-dom';
import { EventData } from '../../interfaces/EventData';
import Card from '../../assets/card.png';

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
    
    return (
        <Link to={`/event/${event.title}`} className={className}>
            <div
                style={{ backgroundImage: `url(${Card})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: colors[color as keyof typeof colors] || colors[autoColorByTopic(event.type) as keyof typeof colors] }}
                className={`${isLarge ? 'w-[400px] px-[80px] pt-[260px] h-[500px]' : 'w-[250px] px-[50px] pt-[160px] h-[310px]'} rounded-[20px] md:rounded-[9px] flex flex-col items-center text-center justify-between`}
            >
                <h3 className={`font-bold w-full ${isLarge ? 'text-[40px]' : 'text-[24px]'}`}>{event.title}</h3>
                <div className='flex flex-col py-1'>
                    <p className={`${isLarge ? 'text-[24px]' : 'text-[14px]'}`}>
                        {event.type}
                    </p>
                    <p className={`${isLarge ? 'text-[20px]' : 'text-[12px]'} opacity-50`}>
                        {new Date(event.starttime.toDate()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </div>
        </Link>
    );
};
