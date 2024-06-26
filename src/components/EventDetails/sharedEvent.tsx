import "firebase/firestore";

import { EventData } from "../../interfaces/EventData";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import getDataByField from '../../firebase/getDataByField'

export const SharedEvent = () => {
    const { name: eventName } = useParams<{ name: string }>();
  
    const [eventData, setEventData] = useState<EventData|null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      let isMounted = true; // Flag to prevent state updates on unmounted component
  
      getDataByField("events", "title", "==", eventName).then(data => {
        console.log(eventName)
        if (isMounted) {
          setEventData(data.result?.[0] || null);
          setLoading(false);
        }
      });
  
      return () => { isMounted = false; }; // Clean up to prevent state updates on unmounted component
    }, [eventName]);
}  