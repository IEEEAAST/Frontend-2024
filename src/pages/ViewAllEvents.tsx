import React, { useEffect, useState } from "react";
import { EventData } from "../interfaces/EventData";
import getCollection from "../firebase/getCollection";
import { NavBar } from "../components/common/navbar";
import sort from "../assets/sort.png";
import sortup from "../assets/sortup.png";
import sortdown from "../assets/sortdown.png";
import { EventCard } from "../components/common/EventCard";
import { Link } from "react-router-dom";

const formatEventDate = (date: Date, format: string) => {
  if (format === "long") {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${formattedDate} at ${time}`;
  } else if (format === "short") {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      year: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const parts = formattedDate.split(' ');
    return `${parts[0]}, ${parts[1]}`;
  }
  return date.toString(); // Fallback if format is not recognized
};

const isEventOngoing = (event: EventData) => {
  return event.endtime && event.endtime.toDate() > new Date();
};

export const ViewAllEvents = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [filter, setFilter] = useState("date");

  const changeFilter = (newfilter: string) => {
    let finalFilter = newfilter;

    if (filter.includes(newfilter)) {
      if (filter.includes("reverse")) {
        finalFilter = newfilter;
      } else {
        finalFilter = newfilter + "-reverse";
      }
    }

    // Set the filter state with the final filter
    setFilter(finalFilter);

    // Use the final filter to sort articles immediately
    filterEvents(finalFilter);
  };

  const filterEvents = (filter: string) => {
    const sortedEvents = [...events]; // Create a new array to avoid mutating state directly

    switch (filter) {
      case "date":
        sortedEvents.sort((a, b) => b.starttime.seconds - a.starttime.seconds);
        break;
      case "date-reverse":
        sortedEvents.sort((a, b) => a.starttime.seconds - b.starttime.seconds);
        break;
      case "topic":
        sortedEvents.sort((a, b) => (b.type || "Event").localeCompare(a.type || "Event"));
        break;
      case "topic-reverse":
        sortedEvents.sort((a, b) => (a.type || "Event").localeCompare(b.type || "Event"));
        break;
      case "likes":
        sortedEvents.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case "likes-reverse":
        sortedEvents.sort((a, b) => (a.likes || 0) - (b.likes || 0));
        break;
    }
    setEvents(sortedEvents);
  };

  useEffect(() => {
    getCollection("events").then((res) => {
      if (res.result && res.ids) {
        const newevents = (res.result as EventData[]).map((event, index) => ({
          ...event,
          id: res.ids ? res.ids[index] : null, // Set the id from res.ids if not null
        }));
        setEvents(newevents.sort((a, b) => b.starttime.seconds - a.starttime.seconds));
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#000B21] text-white header">
      <div className="h-[150px] w-full">
        <NavBar />
      </div>
      <div className="flex justify-between items-center w-full px-4 lg:px-[89px]">
        <h2 className="text-white text-[24px] lg:text-[45px] font-bold">All Events</h2>

        <button className="w-1/6 border-b border-[#141E32] flex justify-between items-center relative h-14" onClick={() => { changeFilter("date") }}>
          Date
          <div className="relative w-5 my-2">
            <img src={sortup} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "date" ? 'opacity-100' : 'opacity-0'}`}></img>
            <img src={sortdown} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "date-reverse" ? 'opacity-100' : 'opacity-0'}`}></img>
            <img src={sort} className={`absolute inset-0 w-full transition-opacity duration-300 ${!(filter.includes("date")) ? 'opacity-100' : 'opacity-0'}`}></img>
          </div>
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${(filter == 'date' || filter == 'date-reverse') ? 'w-full' : 'w-0'} h-[1px] bg-white transition-all`}></div>
        </button>

        <button className="w-1/6 border-b border-[#141E32] flex justify-between items-center relative h-14" onClick={() => { changeFilter('topic') }}>
          Topic
          <div className="relative w-5 my-2">
            <img src={sortup} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "topic" ? 'opacity-100' : 'opacity-0'}`}></img>
            <img src={sortdown} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "topic-reverse" ? 'opacity-100' : 'opacity-0'}`}></img>
            <img src={sort} className={`absolute inset-0 w-full transition-opacity duration-300 ${!(filter.includes("topic")) ? 'opacity-100' : 'opacity-0'}`}></img>
          </div>
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${(filter == 'topic' || filter == 'topic-reverse') ? 'w-full' : 'w-0'} h-[1px] bg-white transition-all`}></div>
        </button>

        <button className="w-1/6 border-b border-[#141E32] flex justify-between items-center relative h-14" onClick={() => { changeFilter("likes") }}>
          Likes
          <div className="relative w-5 my-2">
            <img src={sortup} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "likes" ? 'opacity-100' : 'opacity-0'}`}></img>
            <img src={sortdown} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "likes-reverse" ? 'opacity-100' : 'opacity-0'}`}></img>
            <img src={sort} className={`absolute inset-0 w-full transition-opacity duration-300 ${!(filter.includes("likes")) ? 'opacity-100' : 'opacity-0'}`}></img>
          </div>
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${(filter == 'likes' || filter == 'likes-reverse') ? 'w-full' : 'w-0'} h-[1px] bg-white transition-all`}></div>
        </button>
      </div>
      <div className="w-full px-10">
        <div className="grid grid-cols-[auto_auto_1fr] mt-4 gap-y-8 mb-10">
          {events.map((event, index) => (
            <>
                <p className={`mt-2 text-right mr-6 ${events.slice(0, index).some(e => e.starttime.toDate().getMonth() === event.starttime.toDate().getMonth()) && 'opacity-0'} ${!filter.includes("date") ? 'opacity-0 mr-0 w-0' : 'mr-6'}`}>{formatEventDate(event.starttime.toDate(), "short")}</p>
              <div className={`flex justify-center bg-[#151F33] h-[calc(100%+32px)] overflow-visible  ${!filter.includes("date") ? 'opacity-0 mx-0 w-0' : 'mx-4 w-2'}`}><div className={`${events.some(e => e.starttime.toDate().getMonth() === event.starttime.toDate().getMonth() && e.starttime.toDate().getFullYear() === event.starttime.toDate().getFullYear() && isEventOngoing(e)) ? 'bg-[#57ff57] shadow-[0_0_10px_2px_#57ff57]' : 'bg-[#151F33]'} rounded-full w-10 h-10 flex ${index > 0 && event.starttime.toDate().getMonth() == events[index - 1].starttime.toDate().getMonth() && 'opacity-0'} items-center justify-center absolute`}><div className="bg-white rounded-full w-4 h-4"></div></div></div>
              <Link to={`/event/${event.title}`} className="flex gap-4 w-full ml-6">
                <EventCard event={event} size="sm" />
                <div className="flex flex-col w-[700px]">
                  <h1 className="font-extrabold text-[42px]">{event.title}</h1>
                  <div>
                    {isEventOngoing(event) && <p className="italic text-yellow-600">This event is currently ongoing! Register now!</p>}
                    <p className="font-extralight mb-4 h-24">{event.description}</p>
                  </div>
                  <div className="w-full h-0 border border-[#151F33] my-4"></div>
                  <p className="mt-2 text-sm">Time: from <strong>{formatEventDate(event.starttime.toDate(), "long")}</strong> to <strong>{formatEventDate(event.starttime.toDate(), "long")}</strong></p>
                  <p className="mt-2">Type: <strong>{event.type}</strong></p>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
