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
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const time = date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${formattedDate}, ${time}`;
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
    return "Ongoing! Register now!";
  }
  if ((event.starttime.toDate() > today) && event.formLink && event.formLink.length > 0) {
    return "Coming soon! Register now!"
  }
  if ((event.starttime.toDate() > today)) {
    return "Coming soon!";
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
        {filter.includes("date") && (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#151F33] rounded-full"></div>
            <div className="flex flex-col mt-4 ml-4">
              {filteredEvents.reduce((acc, event, index) => {
          const eventDate = new Date(event.starttime.seconds * 1000);
            const eventMonth = eventDate.toLocaleString('default', { month: 'short' }) + ', ' + eventDate.getFullYear();

          if (index === 0 || eventMonth !== acc[acc.length - 1].month) {
            acc.push({ month: eventMonth, events: [event] });
          } else {
            acc[acc.length - 1].events.push(event);
          }

          return acc;
              }, [] as { month: string, events: EventData[] }[]).map((group, groupIndex) => (
          <div key={groupIndex} className="relative">
            <div className={`absolute -left-[33px] top-0 w-10 h-10 ${group.events.some(isEventOngoing) ? 'bg-green-500 shadow-[0_0_10px_rgba(0,255,0,0.8)]' : 'bg-[#151F33]'} rounded-full flex`}>
              <div className="m-auto bg-white w-3 h-3 rounded-full"></div>
            </div>
            <div className="text-white font-bold mb-2 ml-4 mt-2">{group.month}</div>
            {group.events.map((event) => (
                <Link key={event.id} to={`/event/${event.title}`}>
                  <div className="ml-4 flex gap-2">
                <EventCard
                  event={event}
                  size="sm"
                />
                <div className="w-full flex flex-col max-h-[350px]">
                <p className="font-extrabold text-xl sm:text-3xl">{event.title}</p>
                {isEventOngoing(event) && <p className="italic text-yellow-600 mb-2">{isEventOngoing(event)}</p>}
                <p className="font-extralight mb-2 whitespace-normal overflow-hidden text-ellipsis line-clamp-6">{event.description}</p>
                <hr className="w-full mt-auto border-[#151F33] border-2 mb-2"></hr>
                <p><span className="font-bold">Type: </span><span>{event.type}</span></p>
                <p><span className="font-bold">Starts: </span><span>{formatEventDate(event.starttime.toDate(), "long")}</span></p>   
                <p className="mb-8"><span className="font-bold">Ends: </span><span>{formatEventDate(event.endtime.toDate(), "long")}</span></p>
                </div>
                </div>
                </Link>
            ))}
          </div>
              ))}
            </div>
          </div>
        )}

        {!filter.includes("date") && (
          <div className="flex flex-col gap-6 mt-4">
            {filteredEvents.map((event) => (
              <Link key={event.id} to={`/event/${event.title}`}>
          <EventCard
            event={event}
            size="sm"
          />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

