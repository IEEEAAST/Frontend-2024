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


interface ArticleData {
  article: string;
  author: string;
  caption: string;
  description: string;
  image: string;
  likes : number;
  publishdate: string;
  title: string;
}

interface AuthorData {
  email : string;
  firstname : string;
  imgurl: string;
  lastactive: any;
  lastname: string;
  phonenumber: number;
  role: string;
}

interface Keynotes {
  name: string;
  thumbnail: string;
  url: string;
}

interface Schedule {
  duration: string;
  speaker: string;
  starting : string;
  title: string;
}

interface Videos {
  length: string;
  name: string;
  speaker: string;
  thumbnail: string;
  url: string;
}

interface EventData {
  coverPhoto : string;
  description: string;
  enddtime: any;
  formLink: string;
  gallary: string[];
  keynotes: Keynotes[];
  schedule: Schedule[];
  speakers: string[];
  sponsors: string[];
  starttime: any;
  title: string;
  type: string;
  videos: Videos[];
}

export const Dashboard = () => {
  const navigate = useNavigate(); 
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [events, setEvents] = useState<EventData[]>([])
  const [authors, setAuthors] = useState<{ [key: string]: AuthorData }>({});
  const [searched, setSearched] = useState('');
  const {userData,setUserData} = useContext(UserContext);

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

  const handleArticleClick = (article: ArticleData) => {
    navigate(`/article/${article.title}`);
  };

  if (!articles || articles.length===0){
  
    return <>
    <NavBar/>
    <div className="flex items-center justify-center w-full h-[99vh]"><Spinner size="xl" /></div>
    </>
  }

  return (

    <div className="flex flex-col items-center bg-[#000B21] text-white header">
      <div className="h-[150px] w-full">
        <NavBar/>
        {/* <div className="search">
          <input      
            type="text"
            placeholder="Search articles, events..."
            value={searched}
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </div> */}
      </div>
      {userData?.roles?.includes("admin") || userData?.roles?.includes("author") ? <Link to="/write"><button className="defaultButton mb-12 lg:mb-0">Create Article</button></Link>:null}
      <div className="w-full lg:min-h-screen flex justify-center items-center px-4 md:px-20 body">
        <div className="relative w-full lg:w-[1733px] lg:h-[810px]  h-[400px] md:h-[520px] rounded-[38px] overflow-hidden">
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
            className="object-cover w-full h-full md:h-[1000px] lg:-translate-y-[125px]"
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
          <div className="flex flex-col md:flex-row" key={index} >
            <div className="w-full md:w-[550px] h-[200px] md:h-[250px] md:mr-[58px]">
              <img
                src={article.image || "#"}
                alt="Article"
                className="w-full h-full object-cover rounded-[16px]"
              />
            </div>
            <div className="flex flex-col justify-between w-full mt-4 lg:mt-0">
              <div className="text-[12px] lg:text-[15px] mb-[20px] lg:mb-[33px] text-[#F4F4F4]">
                <h5>-- {authors[article.author]?.firstname || "unknown author"} {authors[article.author]?.lastname || "author"} • {formatDate(authors[article.author]?.lastactive)} ✨ Member-only</h5>
              </div>
              <div className="text-[20px] lg:text-[27px] font-serif">
                <h1>{article.title}</h1>
              </div>
              <div className="text-[16px] lg:text-[22px] mb-[20px] lg:mb-[32px]">
                <h3>
                  {article.caption} 
                  <br/>
                  {article.description}
                </h3>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[10px]">
                  <button className="text-[12px] lg:text-[15px] w-[70px] lg:w-[90px] h-[30px] lg:h-[35px] bg-[#151F33] rounded-[20px]"
                  onClick={() => handleArticleClick(article)}>
                    Swift
                  </button>
                  <p>• 5 min read</p>
                </div>
                <div className="flex items-center gap-[20px] lg:gap-[39px]">
                  <button>
                    <img src={saveicon} alt="save" />
                  </button>
                  <button>
                    <img src={optionIcon} alt="options" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

    <div className="mt-[50px] lg:mt-[100px] w-full px-4 lg:px-[89px]">
        <h2 className="text-white text-[24px] lg:text-[45px] font-bold">Events</h2>
        <div className="mt-[30px] lg:mt-[59px] overflow-x-scroll scrollbar-hide">
          <div className="flex space-x-[20px]">

          <div className="mt-[40px] flex overflow-x-scroll space-x-[40px] scrollbar-hide">
            {filterEvents.map((event, index)=>(
              <div className="flex-shrink-0 w-[450px] h-[350px] lg:h-[590px] bg-purple-600 rounded-[20px] md:rounded-[9px] flex flex-col justify-center items-center text-center" key={index}
                onClick={() => navigate(`/event/${event.title}`)}>
                <h3 className="text-[24px] lg:text-[45px] font-bold mb-[20px]">{event.title}</h3>
                <p className="text-[16px] lg:text-[24px]">
                  {event.description}
                  <br></br>
                  {event.type}
                </p>
                <p className="text-16px] lg:text-[24px]">{formatDate(event.starttime)}</p>
              </div>
            ))}
          </div>
            
          </div>
        </div>
      </div>
        <p className="text-white text-[24px] mt-[10px]">More services coming out soon... stay tuned.<br />
        <a href="#" className="underline block text-center">Tell us what you expect</a>
        </p>
      </div>
  );
};