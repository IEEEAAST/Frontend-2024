import { useEffect, useState } from "react";
import { EventData } from "../interfaces/EventData";
import getCollection from "../firebase/getCollection";
import { EventCard } from "../components/common/EventCard";
import { Link } from "react-router-dom";
import { SortButton } from "../components/common/SortButton";

const topics = ["AI", "Database", "Game", "Media", "Mobile", "Other", "Python", "Security", "Technical", "Web"];

const formatEventDate = (date: Date, format: string) => {
  if (format === "long") {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const time = date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true });
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
  return date.toString(); 
};

const isEventOngoing = (event: EventData) => {
  const today = new Date();
  if (event.endtime && (event.starttime.toDate() < today) && (event.endtime.toDate() > today) && event.formLink && event.formLink.length > 0) {
    return "This event is currently ongoing! Register now!";
  }
  if ((event.starttime.toDate() > today) && event.formLink && event.formLink.length > 0) {
    return "This event is happening soon! Register now!"
  }
  if ((event.starttime.toDate() > today)) {
    return "This event is happening soon!";
  }
  return null;
};

export const ViewAllEvents = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]); //seperate state for topic filtered events to avoid deleting the original events
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

    setFilter(finalFilter);


    filterEvents(finalFilter);
  };

  const filterEvents = (filter: string) => {
    let sortedEvents = [...events];

    switch (filter) {
      case "date":
        sortedEvents.sort((a, b) => b.starttime.seconds - a.starttime.seconds);
        break;
      case "date-reverse":
        sortedEvents.sort((a, b) => a.starttime.seconds - b.starttime.seconds);
        break;

      case "likes":
        sortedEvents.sort((a, b) => (b.likedBy.length ?? 0) - (a.likedBy.length ?? 0));
        break;
      case "likes-reverse":
        sortedEvents.sort((a, b) => (a.likedBy.length ?? 0) - (b.likedBy.length ?? 0));
        break;
    }

    const selectedTopic = document.querySelector('select')?.value || "All";
    if (selectedTopic !== "All") {
      sortedEvents = sortedEvents.filter(event => event.type === selectedTopic);
    }

    setFilteredEvents(sortedEvents);
  };

  useEffect(() => {
    getCollection("events").then((res) => {
      if (res.result && res.ids) {
        const newevents = (res.result as EventData[]).map((event, index) => ({
          ...event,
          id: res.ids ? res.ids[index] : null, 
        }));
        setEvents(newevents.sort((a, b) => b.starttime.seconds - a.starttime.seconds));
        setFilteredEvents(newevents.sort((a, b) => b.starttime.seconds - a.starttime.seconds));
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#000B21] text-white header">
      <div className="h-[150px] w-full"></div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 lg:px-[89px] gap-4">
        <h2 className="text-white text-[24px] m</div>d:text-[32px] lg:text-[45px] font-bold">All Events</h2>

        <SortButton label="Date" filterKey="date" currentFilter={filter} changeFilter={changeFilter} />
        <SortButton label="Likes" filterKey="likes" currentFilter={filter} changeFilter={changeFilter} />
        <select
          className="bg-[#151F33] text-white p-2 rounded h-12 w-full md:w-1/6"
          onChange={(e) => {
            const selectedTopic = e.target.value;
            const filtered = selectedTopic === "All" ? events : events.filter(event => event.type === selectedTopic);
            setFilteredEvents(filtered);
          }}
        >
          <option value="All">All</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full px-10 lg:px-10">
        {filteredEvents.length === 0 && <p className="text-white text-[24px] font-bold text-center mt-40 mb-40">No events found... Check back soon!</p>}
        <div className="grid grid-cols-1 md:grid-cols-[auto_auto_1fr] mt-4 gap-y-8 mb-10">
          {filteredEvents.map((event, index) => (
            <>
              <p className={`mt-2 text-right mr-6 
                ${filteredEvents.slice(0, index).some(e => e.starttime.toDate().getMonth() === event.starttime.toDate().getMonth()) && 'opacity-0'} 
                ${!filter.includes("date") ? 'opacity-0 mr-0 w-0' : 'mr-6'}`}
              >
                {formatEventDate(event.starttime.toDate(), "short")}
              </p>
              <div className={`flex justify-center bg-[#151F33] h-[calc(100%+32px)] overflow-visible  
                ${!filter.includes("date") ? 'opacity-0 mx-0 w-0' : 'mx-4 w-2'}`}
              >
                <div className={`
                  ${filteredEvents.some(e => 
                    e.starttime.toDate().getMonth() === event.starttime.toDate().getMonth() 
                    && e.starttime.toDate().getFullYear() === event.starttime.toDate().getFullYear() 
                    && isEventOngoing(e)) 
                      ? 'bg-[#57ff57] shadow-[0_0_10px_2px_#57ff57]' 
                      : 'bg-[#151F33]'} rounded-full w-10 h-10 flex 
                        ${index > 0 
                          && event.starttime.toDate().getMonth() == filteredEvents[index - 1].starttime.toDate().getMonth() 
                          && 'opacity-0'} items-center justify-center absolute
                `}>
                  <div className="bg-white rounded-full w-4 h-4"></div>
                </div>
              </div>
              <Link to={`/event/${event.title}`} className="flex flex-col md:flex-row  gap-4 w-full ml-0 md:ml-6">
                <EventCard event={event} size="sm" />
                <div className="flex flex-col w-[700px]">
                  <h1 className="font-extrabold text-[42px]">{event.title}</h1>
                  <div>
                    {isEventOngoing(event) && <p className="italic text-yellow-600">{isEventOngoing(event)}</p>}
                    <p className="font-extralight mb-4 h-24">{event.description}</p>
                  </div>
                  <div className="w-full h-0 border border-[#151F33] my-4"></div>
                  <p className="mt-2 text-sm">
                    Time: from <strong>{formatEventDate(event.starttime.toDate(), "long")}</strong> to 
                    <strong>{formatEventDate(event.starttime.toDate(), "long")}</strong>
                  </p>
                  <p className="mt-2">Type: <strong>{event.type}</strong></p>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
