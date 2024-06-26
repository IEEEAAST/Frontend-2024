import firebase from "firebase/compat/app";

export interface EventData {
    title: string;
    description: string;
    starttime: firebase.firestore.Timestamp;
    endtime: firebase.firestore.Timestamp;
    gallery: string[];
    keynotes: string[];
    schedule: Schedule;
    speakers: string[];
    sponsors: string[];
    type: string;
    videos: Ivideo[];
}
export interface Schedule{
    duration: string;
    speaker: string;
    starting : string;
    title : string;
}

export interface Ivideo{
    length: string;
    name: string;
    speaker: string;
    thumbnail: string | null | undefined;
    url: string;
}

export interface Inote {
    name: string;
    thumbnail: string | null | undefined;
    url: string;
}

export interface IResources {
    videos: Ivideo[];
    notes: Inote[];
}