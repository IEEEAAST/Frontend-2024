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
import sort from "../assets/sort.png";
import sortup from "../assets/sortup.png";
import sortdown from "../assets/sortdown.png";
import likes from "../assets/sparkles-white@2x.png";
import { Timestamp } from "firebase/firestore";


interface ArticleData {
  article: string;
  author: string;
  caption: string;
  description: string;
  image: string;
  likes : number;
  publishdate: Timestamp;
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




export const ViewAllArticles = () => {
  const navigate = useNavigate(); 
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [authors, setAuthors] = useState<{ [key: string]: AuthorData }>({});
  const [filter, setFilter] = useState("date");

  const getArrowIcon = (button: string) => {
    if(filter.includes(button)){
        if(filter.includes("reverse")){
            return sortdown
        }
        return sortup
    }
    return sort
  }
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
    console.log(sortedArticles);
    }

  
  


  useEffect(() => {
    getCollection("articles").then((res) => {
      if (res.result) {
        const newarticles = res.result as ArticleData[];
        setArticles(newarticles.sort((a, b) => b.publishdate.seconds - a.publishdate.seconds));

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





  const handleArticleClick = (article: ArticleData) => {
    navigate(`/article/${article.title}`);
  };

  if (!articles || articles.length===0){
  
    return <>
    <NavBar />
    <div className="flex items-center justify-center w-full h-[99vh]"><Spinner size="xl" /></div>
    </>
  }

  return (

    <div className="flex flex-col items-center bg-[#000B21] text-white header mb-6">
      <div className="h-[150px] w-full">
        <NavBar />
      </div>
      
      <div className="w-full px-4 lg:px-[89px]">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-[24px] lg:text-[45px] font-bold">All Articles</h2>
          <button className="w-1/6 border-b border-[#141E32] flex justify-between items-center" onClick={()=>{changeFilter("date")}}>Date<img src={getArrowIcon("date")} className="w-5 my-2 opacity-50"></img></button>
          <button className="w-1/6 border-b border-[#141E32] flex justify-between items-center">Topic<img src={sort} className="w-5 my-2 opacity-50"></img></button>
          <button className="w-1/6 border-b border-[#141E32] flex justify-between items-center" onClick={()=>{changeFilter("likes")}}>Likes<img src={getArrowIcon("likes")} className="w-5 my-2 opacity-50"></img></button>
        </div>

        <div className="mt-[30px] lg:mt-[59px] flex flex-col gap-[30px] lg:gap-[58px]">
        {articles.map((article, index)=>(
            <Link to={`/article/${article.title}`} className="flex flex-col md:flex-row" key={index} >
          <div className="flex flex-col md:flex-row w-full" key={index} >
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
                  <p className="opacity-50 italic text-sm ml-4">{`${article.publishdate.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} at ${article.publishdate.toDate().toLocaleTimeString()}`}</p>
                </div>
                <div className="flex items-center gap-[20px] lg:gap-[39px]">
                <div className="flex gap-1 items-center w-20"><img className="w-8" src={likes}></img>{article.likes}</div>
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
          </Link>
        ))}
        </div>
      </div>
      </div>
  );
};