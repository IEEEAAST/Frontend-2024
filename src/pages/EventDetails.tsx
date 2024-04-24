import "../App.css"
import CustomTabs from "../components/EventDetails/CustomTabs"
import "./styles/EventDetails.css"
import {useParams} from "react-router-dom"


export const EventDetails = () => {
  const eventName = useParams().name
  return (
    <>
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
      <CustomTabs/>
    </>
  )
}
