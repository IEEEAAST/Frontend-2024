import { Timestamp } from "firebase/firestore";
export default interface ArticleData {
    id:string|null;
    article: string;
    author: string;
    caption: string;
    description: string;
    image: string;
    likes: number;
    publishdate: Timestamp;
    title: string;
    topic: string;
    liked: boolean; // Add liked property
  }