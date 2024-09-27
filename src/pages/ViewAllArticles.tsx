import { NavBar } from "../components/common/navbar";
import {Spinner, Avatar} from "@chakra-ui/react";
import "./styles/Dashboard.css";
import getCollection from "../firebase/getCollection.js";
import getDocument from "../firebase/getData.js";
import updateData from "../firebase/updateData.js";
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../App';
import UserData from "../interfaces/userData.js";
import sort from "../assets/sort.png";
import sortup from "../assets/sortup.png";
import sortdown from "../assets/sortdown.png";
import { Timestamp } from "firebase/firestore";
import ArticleCard from "../components/Article/Card/ArticleCard.tsx"

interface ArticleData {
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

export const ViewAllArticles = () => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [authors, setAuthors] = useState<{ [key: string]: UserData }>({});
  const [filter, setFilter] = useState("date");
  const {userData, setUserData ,userId} = useContext(UserContext);

  const getAuthorNamesFromSet = async (authorIdsSet: Set<string>): Promise<void> => {
    console.log(userData);
    const authorIds = Array.from(authorIdsSet);
    authorIds.forEach(async (authorId) => {
      const { result } = await getDocument("users", authorId);
      if (result) {
        const authorData = result?.data() as UserData;
        setAuthors((prevAuthors) => ({ ...prevAuthors, [authorId]: authorData }));
      }
    });
  };

  const changeFilter = (newfilter: string) => {
    let finalFilter = newfilter;

    if (filter.includes(newfilter)) {
      if (filter.includes("reverse")) {
        finalFilter = newfilter;
      } else {
        finalFilter = newfilter + "-reverse";
      }
    }

    // Set the filter state with the final filter
    setFilter(finalFilter);

    // Use the final filter to sort articles immediately
    filterArticles(finalFilter);
  };

  const filterArticles = (filter: string) => {
    const sortedArticles = [...articles]; // Create a new array to avoid mutating state directly

    switch (filter) {
      case "date":
        sortedArticles.sort((a, b) => b.publishdate.seconds - a.publishdate.seconds);
        break;
      case "date-reverse":
        sortedArticles.sort((a, b) => a.publishdate.seconds - b.publishdate.seconds);
        break;
      case "likes":
        sortedArticles.sort((a, b) => b.likes - a.likes);
        break;
      case "likes-reverse":
        sortedArticles.sort((a, b) => a.likes - b.likes);
        break;
    }
    setArticles(sortedArticles);
  };

  const toggleLike = (index: number) => {
    if (!userData) return;
    updateData('users',userId,{likes:{articles:articles[index].liked?userData.likes.articles.filter((id)=>id!=articles[index].id):[...userData.likes.articles,articles[index].id]}}).then((res)=>{
      console.log(res);
    });
    updateData('articles',articles[index].id,{likes:articles[index].liked?articles[index].likes-1:articles[index].likes+1}).then((res)=>{
      console.log(res);
    });
    setArticles((prevArticles) => 
      prevArticles.map((article, i) => {
        if (i === index) {
          const liked = !article.liked;
          return {
            ...article,
            liked,
            likes: liked ? article.likes + 1 : article.likes - 1,
          };
        }
        return article;
      })
    );
  };
  

  useEffect(() => {
    getCollection("articles").then((res) => {
      if (res.result && res.ids) {
        const newarticles = (res.result as ArticleData[]).map((article, index) => ({
          ...article,
          id: res.ids ? res.ids[index] : null, // Set the id from res.ids if not null
          liked: userData?.likes.articles.includes(res.ids ? res.ids[index] : "") || false, // Set liked property based on user data
        }));
        setArticles(newarticles.sort((a, b) => b.publishdate.seconds - a.publishdate.seconds));

        const authorIds = newarticles.map((article) => article.author);
        getAuthorNamesFromSet(new Set(authorIds));
      }
    });
  }, []);

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  if (!articles || articles.length === 0) {
    return <>
      <NavBar />
      <div className="flex items-center justify-center w-full h-[99vh]"><Spinner size="xl" /></div>
    </>;
  }

  return (
    <div className="flex flex-col items-center bg-[#000B21] text-white header mb-6">
      <div className="h-[150px] w-full">
        <NavBar />
      </div>

      <div className="w-full px-4 lg:px-[89px]">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-[24px] lg:text-[45px] font-bold">All Articles</h2>

          <button className="w-1/6 border-b border-[#141E32] flex justify-between items-center relative h-14" onClick={() => { changeFilter("date") }}>
            Date
            <div className="relative w-5 my-2">
              <img src={sortup} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "date" ? 'opacity-100' : 'opacity-0'}`}></img>
              <img src={sortdown} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "date-reverse" ? 'opacity-100' : 'opacity-0'}`}></img>
              <img src={sort} className={`absolute inset-0 w-full transition-opacity duration-300 ${!(filter.includes("date")) ? 'opacity-100' : 'opacity-0'}`}></img>
            </div>
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${(filter == 'date' || filter == 'date-reverse') ? 'w-full' : 'w-0'} h-[1px] bg-white transition-all`}></div>
          </button>

          <button className="w-1/6 border-b border-[#141E32] flex justify-between items-center relative h-14" onClick={() => { }}>
            Topic
            <div className="relative w-5 my-2">
              <img src={sortup} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "topic" ? 'opacity-100' : 'opacity-0'}`}></img>
              <img src={sortdown} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "topic-reverse" ? 'opacity-100' : 'opacity-0'}`}></img>
              <img src={sort} className={`absolute inset-0 w-full transition-opacity duration-300 ${!(filter.includes("topic")) ? 'opacity-100' : 'opacity-0'}`}></img>
            </div>
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${(filter == 'topic' || filter == 'topic-reverse') ? 'w-full' : 'w-0'} h-[1px] bg-white transition-all`}></div>
          </button>

          <button className="w-1/6 border-b border-[#141E32] flex justify-between items-center relative h-14" onClick={() => { changeFilter("likes") }}>
            Likes
            <div className="relative w-5 my-2">
              <img src={sortup} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "likes" ? 'opacity-100' : 'opacity-0'}`}></img>
              <img src={sortdown} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "likes-reverse" ? 'opacity-100' : 'opacity-0'}`}></img>
              <img src={sort} className={`absolute inset-0 w-full transition-opacity duration-300 ${!(filter.includes("likes")) ? 'opacity-100' : 'opacity-0'}`}></img>
            </div>
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${(filter == 'likes' || filter == 'likes-reverse') ? 'w-full' : 'w-0'} h-[1px] bg-white transition-all`}></div>
          </button>
        </div>

        <div className="w-full px-4">
        <div className="mt-[30px] lg:mt-[59px] flex flex-col gap-[30px] lg:gap-[58px]">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              article={article}
              author={authors[article.author]}
              onLikeToggle={() => toggleLike(index)}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};