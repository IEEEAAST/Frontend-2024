import "../App.css"
import "./styles/EventDetails.css"
import { useParams } from "react-router-dom"
import { Sponsors } from "../components/EventDetails/Sponsors"
import { Resources } from "../components/EventDetails/Resources"
import { Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'

import Bell from '../assets/notification-bell-white@2x.png';
import Star from '../assets/fav-event-star-white@2x.png';
import PlusIcon from '../assets/plus.png'
import { Schedule } from "../components/EventDetails/schedule";
import { Speakers } from "../components/EventDetails/Speakers";
import { Social } from "../components/EventDetails/Social";

export const EventDetails = () => {
  const tabsContainer = document.getElementById("tabsContainer");
  if (tabsContainer) {
    tabsContainer.addEventListener("wheel", function(event) {
      console.log("hello")
      const delta = Math.sign(event.deltaY);
      this.scrollLeft += delta * 40; // Adjust scroll speed as needed
    });
  }

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
      <Tabs variant='unstyled' style={{margin:"60px 0px"}}> 
        <TabList bg={"#151F33"} style={{alignItems:"center",borderRadius:"60px",height:"60px",border:"none", padding:"2px 25px"}}>
        <div className="tabsContainer" onWheel={
          (event) => {
            const delta = Math.sign(event.deltaY);
            event.currentTarget.scrollLeft += delta * 30;
          }
        }>
        <Tab><span className="tabLabel">Schedule</span></Tab>
        <Tab><span className="tabLabel">Speakers</span></Tab>
        <Tab><span className="tabLabel">Sponsors</span></Tab>
        <Tab><span className="tabLabel">Resources</span></Tab>
        <Tab className="mr-1"><span className="tabLabel">Gallery</span></Tab>
        </div>
          <div className="iconButtonsWrapper">
          <button className="iconButton" style={{backgroundImage:`url(${Bell})`}}></button>
          <button className="iconButton" style={{backgroundImage:`url(${Star})`}}></button>
          </div>
          <button className="defaultButton" style={{alignSelf:"center"}}><span className="buttonText">Attend</span><span className="plusButton"><img src={PlusIcon} /></span></button>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Schedule />
          </TabPanel>
          <TabPanel>
            <Speakers/>
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
  )
}