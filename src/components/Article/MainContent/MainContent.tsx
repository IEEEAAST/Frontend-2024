import "./styles/MainContent.css";
import { LikeSaveShare } from "./LikeSaveShare";
import { Modal } from "../Modal/Modal";
import { useState , useEffect} from "react";
import getCollection from "../../../firebase/getCollection.js";

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

interface headerSearch {
  searchQuery : string;
}

export const MainContent: React.FC<headerSearch> = ({searchQuery}) => {
  const [isFollowing, setIsFollowing] = useState(true);
  const [modal, setModal] = useState(false);
  const [articleData, setArticleData] = useState<ArticleData[]>([])
  const [authorData, setAuthorData] = useState<AuthorData | null>(null);
  const [authors, setAuthors] = useState<AuthorData[]>([]);

  useEffect(() => {
    getCollection('articles').then(res => {
      if (res.result) {
        setArticleData(res.result as ArticleData[]);
      }
    });
  }, []);

  useEffect(()=>{
    getCollection('users').then(res =>{
      if(res.result){
        setAuthorData(res.result[5] as AuthorData)
        setAuthors(res.result as AuthorData[]);
      }
    })
  },[])

  console.log(articleData)
  console.log(authors)
  console.log("search query:", searchQuery)

  // const date = authorData?.lastactive.toDate()
  // const formattedDate = date.toLocaleDateString();

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const filteredArticles = articleData.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredAuthors = authors.filter(author =>
    `${author.firstname} ${author.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedArticle = filteredArticles.length > 0 ? filteredArticles[0] : articleData[5];
  const displayedAuthor = filteredAuthors.length > 0 ? filteredAuthors[0] : authorData;

  if (!articleData) {
    return <div>Loading...</div>;
  }

  if (!authorData){
    return<div>Loading ....</div>
  }

  return (
    <div className="main-content">

        <span className="title">{displayedArticle.title}</span>
        <span className="description">{displayedArticle.description}</span>
        <div className="profile">
          <div className="pfp">
            <img src={displayedAuthor?.imgurl} alt={`${displayedAuthor?.firstname} ${displayedAuthor?.lastname}`}></img>
          </div>
          <div className="profile-desc">
            <span className="desc-title">
            {`${displayedAuthor?.firstname} ${displayedAuthor?.lastname}`} •
              <span
                onClick={toggleFollow}
                style={{ color: isFollowing ? "dodgerblue" : "" }}
              >
                {isFollowing ? "Follow" : "Following"}
              </span>
            </span>
            <span className="desc-time">{}</span>
          </div>
        </div>
        <hr />
        <LikeSaveShare />
        <hr />
        <div className="article-img">
          <img src={displayedArticle.image} alt="Article" />
        </div>
        <caption>{displayedArticle.caption}</caption>
        <div className="article-desc">
          {displayedArticle.article}
        </div>
        <LikeSaveShare />
        <hr />
        <a href="">More from {`${displayedAuthor?.firstname} ${displayedAuthor?.lastname}`}</a>
        <hr />
        <a onClick={()=>setModal(true)}><u>Report</u></a>
        <hr />
        <a href="">Help</a>

      {modal && <Modal closeModal={setModal}/>}
    </div>
  );
};
