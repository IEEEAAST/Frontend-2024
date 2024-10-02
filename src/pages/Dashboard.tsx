import arrowRightIcon from "../assets/right-arrow-svgrepo-com.svg";
import saveicon from "../assets/bookmark-ribbon-white.png";
import optionIcon from "../assets/more-ellipsis-white.png";
import { NavBar } from "../components/common/navbar";
import {Spinner, Center} from "@chakra-ui/react";
import "./styles/Dashboard.css";
import getCollection from "../firebase/getCollection.js";
import getDocument from "../firebase/getData.js";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../App';
import UserData from "../interfaces/userData.js";
import ArticleCard from "../components/Article/Card/ArticleCard.js";
import ArticleData from "../interfaces/ArticleData";
import {EventData} from "../interfaces/EventData";
import { EventCard } from "../components/common/EventCard.js";

interface AuthorData {
  email : string;
  firstname : string;
  imgurl: string;
  lastactive: any;
  lastname: string;
  phonenumber: number;
  role: string;
}

export const Dashboard = () => {
  const navigate = useNavigate(); 
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [events, setEvents] = useState<EventData[]>([])
  const [authors, setAuthors] = useState<{ [key: string]: AuthorData }>({});
  const [searched, setSearched] = useState('');

  useEffect(() => {
    getCollection("articles").then((res) => {
      if (res.result) {
        const articles = res.result as ArticleData[];
        setArticles(articles);

        const authorIds = articles.map(article => article.author);
        const uniqueAuthorIds = [...new Set(authorIds)];
        uniqueAuthorIds.forEach(authorId => {
          getDocument("users", authorId).then((res) => {
            if (res.result) {
              const authorData = res.result.data() as AuthorData; 
              setAuthors(prevAuthors => ({
                ...prevAuthors,
                [authorId]: authorData,
              }));
            }
          });
        });
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

  useEffect(()=>{
    getCollection('events').then(res=>{
      if(res.result){
        setEvents(res.result)
      }
    })
  },[]);

  // const filterArticles = searched ? articles.filter((a) =>
  //   a.title.toLowerCase().includes(searched.toLowerCase())
  // ):articles.slice(0, 3);

  const filterArticles =   articles.slice(0, 3);
  // console.log("filered articles", filterArticles)

  const filterEvents =  events.slice(0, 3);

  // const filterEvents = searched ? events.filter((e) =>
  //   e.title.toLowerCase().includes(searched.toLowerCase())
  // ) : events;

  const handleSearch = (query: string) => {
    setSearched(query);
  };
  console.log("search" , searched)
  // const handleFocus = () => {
  //   document.querySelector(".body")?.classList.add("blur-background");
  // };

  // const handleBlur = () => {
  //   document.querySelector(".body")?.classList.remove("blur-background");
  // };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     handleBlur();
  //   }
  // };

  if (!articles || articles.length===0){
  
    return <>
    <div className="flex items-center justify-center w-full h-[99vh]"></div>
    </>
  }

  return (

    <div className="flex flex-col items-center bg-[#000B21] text-white header">
      <div className="mb-40 lg:size-[8px]">
      </div>
      <div className="w-full lg:min-h-screen flex justify-center items-center px-4 md:px-20 body">
        <div className="relative w-full lg:w-[73rem] lg:h-[45rem]  h-[400px] md:h-[520px] rounded-[38px] overflow-hidden">
          <div className="absolute z-10 w-full lg:h-screen h-full bg-gradient-to-t from-[#000B21A5] via-transparent bottom-0"></div>

          <div className="absolute bottom-[83px] z-10 left-[35px] text-white">
            <h2 className="text-[24px] lg:text-[50px] font-serif font-black">{filterArticles[0].title || "no title"}</h2>
            <h3 className="text-[14px] lg:text-[24px]">Article • Design • {authors[filterArticles[0].author]?.firstname || "unknown author"}</h3>
            <button className="w-[100px] lg:w-[169px] h-[40px] lg:h-[59px] text-[14px] lg:text-[21px] bg-white text-black font-bold rounded-[20px] lg:rounded-[29px] mt-[20px] lg:mt-[45px]"
              onClick={() =>navigate(`/article/${filterArticles[0].title}`)}
              >
                View
            </button>
          </div>

          <img
            className="object-cover w-full h-full"
            src={filterArticles[0].image}
            alt="Event"
          />
        </div>
      </div>
      
      <div className="mt-[50px] lg:mt-[100px] w-full px-4 lg:px-[89px]">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-[24px] lg:text-[45px] font-bold">Latest Articles</h2>
          <Link to="/articles">
          <button className="flex items-center text-[16px] lg:text-[30px] text-white">
            View all
            <img className="ml-[8px]" src={arrowRightIcon} width={24} alt="arrow right" />
          </button>
          </Link>
        </div>

        <div className="mt-[30px] lg:mt-[59px] flex flex-col gap-[30px] lg:gap-[58px]">
        {filterArticles.map((article, index)=>(
          <ArticleCard article={article} key={index}/>
        ))}
        </div>
      </div>

    <div className="mt-[50px] lg:mt-[100px] w-full px-4 lg:px-[89px]">
        <div className="flex justify-between items-center">
        <h2 className="text-white text-[24px] lg:text-[45px] font-bold">Events</h2>
        <Link to="/events">
        <button className="flex items-center text-[16px] lg:text-[30px] text-white">
            View all
            <img className="ml-[8px]" src={arrowRightIcon} width={24} alt="arrow right" />
        </button>
        </Link>
        </div>
        <div className="mt-[30px] lg:mt-[59px]">
          <div className="flex gap-[20px]">

          <div className="flex overflow-y-visible gap-[40px] mb-16 justify-between w-full">
            {filterEvents.map((event)=>(
              <EventCard event={event} size={"lg"}/>
            ))}
          </div>
            
          </div>
        </div>
      </div>
      </div>
  );
};