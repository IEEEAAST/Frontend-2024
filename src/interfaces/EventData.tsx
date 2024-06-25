import firebase from "firebase/compat/app";

export interface EventData {
    title: string;
    description: string;
    starttime: firebase.firestore.Timestamp;
    endtime: firebase.firestore.Timestamp;
    gallery: string[];
    keynotes: any;
    schedule: Schedule;
    speakers: string[];
    sponsors: string[];
    type: string;
    videos: string[];
}
export interface Schedule{
    duration: string;
    speaker: string;
    starting : string;
    title : string;
}