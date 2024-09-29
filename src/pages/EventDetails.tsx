import "../App.css";
import "./styles/EventDetails.css";
// Removed unused import
import { Timestamp } from "firebase/firestore";

import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useContext } from "react";
import { Sponsors } from "../components/EventDetails/Sponsors";
import { Resources } from "../components/EventDetails/Resources";
import { NavBar } from "../components/common/navbar";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from "@chakra-ui/react";

import Bell from "../assets/notification-bell-white@2x.png";
import Like from "../assets/sparkles-white@2x.png";
import Liked from "../assets/sparkles-orange@2x.png";
import PlusIcon from "../assets/plus.png";
import { Schedule } from "../components/EventDetails/schedule";
import { Speakers } from "../components/EventDetails/Speakers";
import Gallery from "../components/EventDetails/Gallery";
import subscribeToDocumentsByField from "../firebase/subscribeToDocumentsByField";

import { EventData } from "../interfaces/EventData";
import { Ivideo, Inote, IsponsorsIds, scheduleItem, IspksIds } from "../interfaces/EventData";
import { UserContext } from "../App";
import UserData from "../interfaces/userData";
import { toggleLike } from "../utils";

export const EventDetails = () => {
  const { name: eventName } = useParams<{ name: string }>();

  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Ivideo[]>([]);
  const [notes, setNotes] = useState<Inote[]>([]);
  const [sponsorIds, setSponsorIDs] = useState<IsponsorsIds>();
  const [isResourcesEnabled, setIsResourcesEnabled] = useState(false);
  const [isSponsorEnabled, setSponsorEnabled] = useState(false);
  const [speakers, setSpeakers] = useState<IspksIds>();
  const [schedule, setSchedule] = useState<scheduleItem[]>([]);

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (eventData?.id) {
      if (userData && userId) {
        
        toggleLike(eventData, userData, userId, "event", setUserData);
        eventData.likedBy?.includes(userId) ? eventData.likedBy = eventData.likedBy.filter((id) => id !== userId) : eventData.likedBy?.push(userId);
      }
    }
  };

  const {userData,userId,setUserData} = useContext(UserContext);
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
    return date.toString(); // Fallback if format is not recognized
  };


  const fetchData = useCallback(async () => {
    const unsubscribe = subscribeToDocumentsByField("events", "title", "==", eventName, (data:any) => {;
    const event = data.result?.[0] || null;

    setEventData(event);
    setLoading(false);

    if (event) {
      if (event.videos) {
        setVideos(event.videos);
        setIsResourcesEnabled(true);
      }
      if (event.keynotes) {
        setNotes(event.keynotes);
        setIsResourcesEnabled(true);
      }
      if (event.sponsors) {
        setSponsorIDs(event.sponsors);
        setSponsorEnabled(true);
      }
      if (event.speakers) {
        setSpeakers(event.speakers);
      }
      if (event.schedule) {
        setSchedule(event.schedule);
      }
    }
  });
  return () => unsubscribe();
  }, [eventName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return loading ? (
    <div className="h-screen flex justify-center items-center">
      <Spinner size={"xl"} className="flex " />
    </div>
  ) : (
    <>
      <NavBar />
      <div className="h-28" style={{ borderColor: "#00091A", borderWidth: "4px" }}></div>
      <div id="eventPage">
        <div
          className="flex items-center justify-center mt-4 w-full h-[400px] rounded-3xl border-8"
          style={{
            backgroundImage: `url(${eventData?.coverPhoto})`,
            backgroundColor: "white",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderColor: "#00091A",
          }}
        ></div>
        <div id="eventDetailsFlex">
          <div id="eventNameWrapper">
            <div className="flex items-center gap-4">
            <span className="text-[50px] font-display font-bold flex flex-wrap items-center w-auto whitespace-normal">
            <span className="flex-shrink">{/* First part of the text */}
                {eventData?.title?.split(' ').slice(0, -1).join(' ') ?? "Error"}
            </span>
            <span className="flex items-center whitespace-nowrap">
              &nbsp;{/* Space to separate */}
              {eventData?.title?.split(' ').slice(-1)}{/* Last word */}
              <button
                className="w-[50px] h-[50px] p-[2px] flex gap-2 items-center text-lg font-body font-normal ml-2"
                onClick={handleLikeClick}
              >
                <img
                  src={eventData && userData && userData?.likes.events?.includes(eventData?.id) ? Liked : Like}
                  alt="like icon"
                />
                {eventData?.likedBy?.length}
              </button>
            </span>
            </span>    
            </div>
            <span id="eventDesc">{eventData?.description ?? "Event not found."}</span>
          </div>
          <div id="eventDetailsWrapper">
            <span>Time: from
            <strong> {formatEventDate(eventData?.starttime?.toDate()||new Date(),"long")}</strong> to
            <strong> {formatEventDate(eventData?.endtime?.toDate()||new Date(),"long")}</strong></span>
            <span>Type: <strong>{eventData?.type}</strong></span>
          </div>
        </div>
        <Tabs variant="unstyled" style={{ margin: "60px 0px" }}>
          <TabList
            bg={"#151F33"}
            style={{
              alignItems: "center",
              borderRadius: "60px",
              height: "60px",
              border: "none",
              padding: "2px 25px",
            }}
          >
            <div
              className="tabsContainer customScrollbar"
              onWheel={(event) => {
                const delta = Math.sign(event.deltaY);
                event.currentTarget.scrollLeft += delta * 30;
              }}
            >
              <Tab><span className="tabLabel">Schedule</span></Tab>
              <Tab><span className="tabLabel">Speakers</span></Tab>
              <Tab isDisabled={!isSponsorEnabled}><span className="tabLabel">Sponsors</span></Tab>
              <Tab isDisabled={!isResourcesEnabled}><span className="tabLabel">Resources</span></Tab>
              <Tab className="mr-1"><span className="tabLabel">Gallery</span></Tab>
            </div>
            <div className="iconButtonsWrapper">
              <button className="iconButton" style={{ backgroundImage: `url(${Bell})` }}></button>
              
            </div>
            <button
              className="defaultButton"
              style={{ alignSelf: "center" }}
              disabled={!eventData?.formLink}
              onClick={() => eventData?.formLink && window.open(eventData.formLink, "_blank")}
            >
              <span className="buttonText">Attend</span>
              <span className="plusButton"><img src={PlusIcon} alt="plus" /></span>
            </button>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Schedule schedules={schedule} />
            </TabPanel>
            <TabPanel>
              <Speakers speakersIds={speakers} />
            </TabPanel>
            {isSponsorEnabled && (
              <TabPanel>
                <Sponsors sponsorIds={sponsorIds} />
              </TabPanel>
            )}
            {isResourcesEnabled && (
              <TabPanel>
                <Resources videos={videos} notes={notes} />
              </TabPanel>
            )}
            <TabPanel>
              <Gallery images={eventData?.gallery || []} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
};
