import "../App.css";
import "./styles/EventDetails.css";
import "firebase/firestore";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sponsors } from "../components/EventDetails/Sponsors";
import { Resources } from "../components/EventDetails/Resources";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import Bell from '../assets/notification-bell-white@2x.png';
import Star from '../assets/fav-event-star-white@2x.png';
import PlusIcon from '../assets/plus.png';
import { Schedule } from "../components/EventDetails/schedule";
import { Speakers } from "../components/EventDetails/Speakers";
import getDataByField from "../firebase/getDataByField";

import { EventData } from "../interfaces/EventData";

export const EventDetails = () => {
  const { name: eventName } = useParams<{ name: string }>();

  const [eventData, setEventData] = useState<EventData|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    getDataByField("events", "title", "==", eventName).then(data => {
      if (isMounted) {
        setEventData(data.result?.[0] || null);
        setLoading(false);
        console.log(data.result?.[0]);
        window.open(data.result?.[0].coverPhoto, "_blank"); 
      }
    });

    return () => { isMounted = false; }; // Clean up to prevent state updates on unmounted component
  }, [eventName]);

  // Handle cases where eventData is null or undefined

  return (
    <div id="eventPage">
      <div id="eventDetailsFlex">
        <div id="eventNameWrapper">
          <span id="eventName">{loading ? "Loading..." : eventData?.title ?? "Error"}</span>
          <span id="eventDesc">{loading ? "Please wait...":eventData?.description ?? "Event not found."}</span>
        </div>
        <div id="eventDetailsWrapper">
          <span>Time: <b>from 12 July 12:00 PM to 15 July 9:00 PM</b></span>
          <span>Type: <b>Online, Session</b></span>
          <span>Seats: <b>Limited (25 left)</b></span>
        </div>
      </div>
      <Tabs variant='unstyled' style={{ margin: "60px 0px" }}>
        <TabList bg={"#151F33"} style={{ alignItems: "center", borderRadius: "60px", height: "60px", border: "none", padding: "2px 25px" }}>
          <div className="tabsContainer" onWheel={(event) => {
            const delta = Math.sign(event.deltaY);
            event.currentTarget.scrollLeft += delta * 30;
          }}>
            <Tab><span className="tabLabel">Schedule</span></Tab>
            <Tab><span className="tabLabel">Speakers</span></Tab>
            <Tab><span className="tabLabel">Sponsors</span></Tab>
            <Tab><span className="tabLabel">Resources</span></Tab>
            <Tab className="mr-1"><span className="tabLabel">Gallery</span></Tab>
          </div>
          <div className="iconButtonsWrapper">
            <button className="iconButton" style={{ backgroundImage: `url(${Bell})` }}></button>
            <button className="iconButton" style={{ backgroundImage: `url(${Star})` }}></button>
          </div>
          <button className="defaultButton" style={{ alignSelf: "center" }}>
            <span className="buttonText">Attend</span>
            <span className="plusButton"><img src={PlusIcon} alt="plus" /></span>
          </button>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Schedule />
          </TabPanel>
          <TabPanel>
            <Speakers />
          </TabPanel>
          <TabPanel>
            <Sponsors />
          </TabPanel>
          <TabPanel>
            <Resources />
          </TabPanel>
          <TabPanel>
            {/* Gallery */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
