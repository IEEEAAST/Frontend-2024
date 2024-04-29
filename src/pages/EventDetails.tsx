import "../App.css"
import "./styles/EventDetails.css"
import { useParams } from "react-router-dom"
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'

import Bell from '../assets/notification-bell-white.png';
import Star from '../assets/fav-event-star-white.png';
import { Schedule } from "../components/EventDetails/schedule";
import { Speakers } from "../components/EventDetails/Speakers";

export const EventDetails = () => {
  const eventName = useParams().name
  return (
    <div id="eventPage">
      <div id="eventDetailsFlex">
        <div id="eventNameWrapper">
          <span id="eventName">{eventName}</span> {/* For now, this displays whatever is in the url params. Will interact with DB next phase */}
          <span id="eventDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quaerat quis ex hic, molestiae nemo sunt possimus optio dolorum commodi doloribus maxime soluta recusandae praesentium illo eveniet impedit, earum sint!</span>
        </div>
        <div id="eventDetailsWrapper">
          <span>Time: <b>from 12 July 12:00 PM to 15 July 9:00 PM</b></span>
          <span>Type: <b>Online, Session</b></span>
          <span>Seats: <b>Limited (25 left)</b></span>
        </div>
      </div>
      <Tabs position='relative' variant='unstyled' style={{ margin: "60px 0px" }}>
        <TabList bg={"#151F33"} style={{ borderRadius: "60px", height: "60px", border: "none", padding: "2px 25px" }}>
          <Tab>Schedule</Tab>
          <Tab>Speakers</Tab>
          <Tab>Sponsors</Tab>
          <Tab>Resources</Tab>
          <Tab style={{ marginRight: "20px" }}>Gallery</Tab>
          <button className="iconButton" style={{ marginLeft: "auto", backgroundImage: `url(${Bell})` }}></button>
          <button className="iconButton" style={{ backgroundImage: `url(${Star})` }}></button>
          <button className="defaultButton" style={{ alignSelf: "center" }}>Attend</button>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='white' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
            <Schedule />
          </TabPanel>
          <TabPanel>
            <Speakers />
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}