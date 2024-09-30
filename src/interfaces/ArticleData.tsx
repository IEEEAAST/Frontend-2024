import { Timestamp } from "firebase/firestore";
export default interface ArticleData {
    id:string|null;
    article: string;
    author: string;
    caption: string;
    description: string;
    image: string;
    likedBy: string[];
    publishdate: Timestamp;
    title: string;
    topic: string;
  }