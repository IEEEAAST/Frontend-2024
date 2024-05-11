import "../App.css"
import "./styles/EventDetails.css"
import { useParams } from "react-router-dom"
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'

import Bell from '../assets/notification-bell-white@2x.png';
import Star from '../assets/fav-event-star-white@2x.png';
import ScheduleIcon from '../assets/schedule.png';
import SpeakersIcon from '../assets/speakers.png'
import SponsorsIcon from '../assets/sponsorships.png'
import ResourcesIcon from '../assets/resources.png'
import GalleryIcon from '../assets/gallery.png'
import PlusIcon from '../assets/plus.png'
import { Schedule } from "../components/EventDetails/Schedule";
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
      <Tabs variant='unstyled' style={{margin:"60px 0px"}}>
        <TabList bg={"#151F33"} style={{alignItems:"center",borderRadius:"60px",height:"60px",border:"none", padding:"2px 25px"}}>
        <Tab><span className="tabLabel">Schedule</span><span className="tabIcon"><img src={ScheduleIcon}/></span></Tab>
        <Tab><span className="tabLabel">Speakers</span><span className="tabIcon"><img src={SpeakersIcon}/></span></Tab>
        <Tab><span className="tabLabel">Sponsors</span><span className="tabIcon"><img src={SponsorsIcon}/></span></Tab>
        <Tab><span className="tabLabel">Resources</span><span className="tabIcon"><img src={ResourcesIcon} /></span></Tab>
        <Tab className="mr-1"><span className="tabLabel">Gallery</span><span className="tabIcon"><img src={GalleryIcon} /></span></Tab>
          <div className="iconButtonsWrapper">
          <button className="iconButton" style={{backgroundImage:`url(${Bell})`}}></button>
          <button className="iconButton" style={{backgroundImage:`url(${Star})`}}></button>
          </div>
          <button className="defaultButton" style={{alignSelf:"center"}}><span className="hidden sm:block">Attend</span><span className="block sm:hidden plusButton"><img src={PlusIcon} /></span></button>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='white' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
            <p className="text-3xl">Schedule</p>
            <Schedule />
          </TabPanel>
          <TabPanel>
            <p className="text-3xl">Speakers</p>
            <Speakers />
          </TabPanel>
          <TabPanel>
            <p className="text-3xl">Sponsors</p>
          </TabPanel>
          <TabPanel>
          </TabPanel>
          <TabPanel>
            <p className="text-3xl">Gallery</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}