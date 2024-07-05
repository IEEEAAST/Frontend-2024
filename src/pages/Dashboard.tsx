import imgContainer from "../assets/images/eventarticlesImg.webp";
import arrowRightIcon from "../assets/right-arrow-svgrepo-com.svg";
// import articleImage1 from "../assets/images/urn aaid sc US 360876a4-664a86-9505-fdd8c336159f;revision=0.webp";
// import articleImage2 from "../assets/images/urn aaid sc US 360876a4-a18b-4a86-9505-fdd8c336159f;revision=0.webp";
// import articleImage3 from "../assets/images/urn aaid sc US 360876a4-664a86-9505-fdd8c336159f;revision=0.webp";
import saveicon from "../assets/bookmark-ribbon-white.png";
import optionIcon from "../assets/more-ellipsis-white.png";
import { NavBar } from "../components/common/navbar";
import "./styles/Dashboard.css";
import getCollection from "../firebase/getCollection.js"
import getDocument from "../firebase/getData.js";
import { useEffect, useState } from "react";
import { Article } from "./Article.js";
import { StringColorFormat } from "@faker-js/faker";
// import SponsorData from "../interfaces/Sponsor.js";


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

interface AuthorData{
  email : string;
  firstname : string;
  imgurl: string;
  lastactive: any;
  lastname: string;
  phonenumber: number;
  role: string;
}

interface Keynotes{
  name: string;
  thumbnail: string;
  url: string;
}

interface Schedule{
  duration: string;
  speaker: string;
  starting : string;
  title: string;
}

interface Videos{
  length: string;
  name: string;
  speaker: string;
  thumbnail: string;
  url: string;
}

interface EventData{
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

  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [events, setEvents] = useState<EventData[]>([])
  const [authors, setAuthors] = useState<{ [key: string]: AuthorData }>({});
  // const [lastActive, setLastActive] = useState('');
  const [searched, setSearched] = useState('');

  //fetch articles and authors
  useEffect(() => {
    getCollection("articles").then((res) => {
      if (res.result) {
        const articles = res.result as ArticleData[];
        setArticles(articles);

        const authorIds = articles.map(article => article.author);
        console.log("authorID", authorIds)
        const uniqueAuthorIds = [...new Set(authorIds)];
        uniqueAuthorIds.forEach(authorId => {
          getDocument("users", authorId).then((res) => {
            if (res.result) {
              const authorData = res.result.data() as AuthorData; // Extract data from DocumentSnapshot
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



  console.log("articles", articles);
  console.log("authors", authors)
  // const id = articles[0].author
  console.log("auth of article 1", authors[0])
  //fetch events
  useEffect(()=>{
    getCollection('events').then(res=>{
      if(res.result){
        setEvents(res.result)
      }
    })
  },[]);
  console.log("events", events)

  const filterArticles = searched ? articles.filter((a) =>
    a.title.toLowerCase().includes(searched.toLowerCase())
  ):articles.slice(0, 3);
  console.log("filtered article", filterArticles)

  // const displayedArticle = filterArticles.length > 0 ? filterArticles[0] : articles[0];
  // console.log("displayed article", displayedArticle)

  const filterEvents = searched ? events.filter((e) =>
    e.title.toLowerCase().includes(searched.toLowerCase())
  ) : events;
  console.log("filtered event", filterEvents)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value);
  };

  if (articles.length===0){
    return <div>loading....</div>
  }
  if(!authors){
    <div>loading....</div>
  }
  console.log(`searched val: ${searched}`);

  return (
    //header
    <div className="flex flex-col items-center bg-[#000B21] text-white header">
      <div className="h-[150px] w-full">
        <NavBar />
        {/* add search */}
        <div className="search">
          <input      
            type="text"
            placeholder="Search articles, events..."
            value={searched}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="relative w-[1733px] h-[988px] rounded-[38px] overflow-hidden">
          <div className="absolute z-10 w-full h-screen bg-gradient-to-t from-[#000B21A5] via-transparent bottom-0"></div>

          <div className="absolute bottom-[83px] z-10 left-[35px] text-white">
            <h2 className="text-[50px] font-serif font-black">{filterArticles[0].title || "no title"}</h2>
            <h3 className="text-[24px]">Article • Design • {authors[filterArticles[0].author]?.firstname || "unknown author"}</h3>
            <button className="w-[169px] h-[59px] text-[21px] bg-white text-black font-bold rounded-[29px] mt-[45px]">
              View
            </button>
          </div>

          <img
            className="object-cover w-full -translate-y-[125px]"
            src={imgContainer}
            alt="Event"
          />
        </div>
      </div>
      
      <div className="mt-[100px] w-full px-[89px]">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-[45px] font-bold">Latest Articles</h2>
          <button className="flex items-center text-[30px] text-white">
            View all
            <img className="ml-[8px]" src={arrowRightIcon} width={24} alt="arrow right" />
          </button>
        </div>

        <div className="mt-[59px] flex flex-col gap-[58px]">
        {filterArticles.map((article, index)=>(
          <div className="flex" key={index}>
            <div className="w-[460px] h-[302px] mr-[58px]">
            <img
                src={article.image || "#"}
                alt="Article"
                className="w-[460px] h-[302px] object-cover rounded-[16px]"
              />
            </div>
            <div className="flex flex-col justify-between w-full">
              <div className="text-[15px] mb-[33px] text-[#F4F4F4]">
                <h5>-- {authors[article.author]?.firstname || "unknown author"} {authors[article.author]?.lastname || "author"} • {formatDate(authors[article.author]?.lastactive)} ✨ Member-only</h5>
              </div>
              <div className="text-[27px] font-serif">
                <h1>{article.title}</h1>
              </div>
              <div className="text-[22px] mb-[32px]">
                <h3>
                  {article.caption} 
                  <br/>
                  {article.description}
                </h3>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-[10px]">
                  <button className="text-[15px] w-[90px] h-[35px] bg-[#151F33] rounded-[20px]">
                    Swift
                  </button>
                  <p>• 5 min read</p>
                </div>
                <div className="flex items-center gap-[39px]">
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

    {/* events */}
      <div className="mt-[100px] w-full px-[89px]">
        <h2 className="text-white text-[45px] font-bold">Events</h2>
        <div className="mt-[59px] overflow-x-scroll scrollbar-hide">
          <div className="flex space-x-[20px]">

            {filterEvents.map((event, index)=>(
              <div className="flex-shrink-0 w-[537px] h-[686px] bg-purple-600 rounded-[12px] flex flex-col justify-center items-center text-center" key={index}>
                <h3 className="text-[45px] font-bold mb-[20px]">{event.title}</h3>
                <p className="text-[24px]">
                  {event.description}
                  <br></br>
                  {event.type}
                </p>
                <p className="text-[24px]">{formatDate(event.starttime)}</p>
              </div>
            ))}

            
          </div>
        </div>
      </div>
        <p className="text-white text-[24px] mt-[10px]">More services coming out soon... stay tuned.<br />
        <a href="#" className="underline block text-center">Tell us what you expect</a>
        </p>
      </div>
  );
};
