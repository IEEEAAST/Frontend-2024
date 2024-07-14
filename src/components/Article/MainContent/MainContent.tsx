import "./styles/MainContent.css";
import { LikeSaveShare } from "./LikeSaveShare";
import { Modal } from "../Modal/Modal";
import { useState , useEffect} from "react";
import getCollection from "../../../firebase/getCollection.js";
import getDocument from "../../../firebase/getData.js";

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

interface MainContentProps {
  searchQuery : string;
  articleName : any;
}

export const MainContent: React.FC<MainContentProps> = ({searchQuery, articleName}) => {
  const [isFollowing, setIsFollowing] = useState(true);
  const [modal, setModal] = useState(false);
  const [articleData, setArticleData] = useState<ArticleData[]>([])
  const [authorData, setAuthorData] = useState<AuthorData | null>(null);


  useEffect(() => {
    getCollection('articles').then(res => {
      if (res.result) {
        setArticleData(res.result as ArticleData[]);
      }
    });
  }, []);

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (articleData.length > 0) {
        let article;
        if (articleName) {
          article = articleData.find(article => article.title === articleName);
        } else if (searchQuery) {
          article = articleData.find(article => article.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (!article) {
          article = articleData[0];
        }

        if (article) {
          const res = await getDocument("users", article.author);
          if (res.result) {
            const auth = res.result.data() as AuthorData;
            setAuthorData(auth);
          }
        }
      }
    };

    fetchAuthorData();
  }, [articleName, searchQuery, articleData]);

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

  console.log("articleData", articleData)
  console.log("search query:", searchQuery)
  console.log("authdata", authorData)

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const displayedArticle = articleName != "ArticleName"
    ? articleData.find(article => article.title === articleName)
    : (searchQuery
      ? articleData.find(article => article.title.toLowerCase().includes(searchQuery.toLowerCase()))
      : articleData[0]);

  console.log("articleName:", articleName);
  console.log("displayedArticle:", displayedArticle);

  if (!displayedArticle) {
    return <div>No article found.</div>;
  }

  if (!articleData) {
    return <div>Loading...</div>;
  }

  if (!authorData){
    return <div>loading...</div>
  }

  return (
    <div className="main-content">
        <span className="title">{displayedArticle.title}</span>
        <span className="description">{displayedArticle.description}</span>
        <div className="profile">
          <div className="pfp">
            <img src={authorData?.imgurl} alt={`${authorData?.firstname} ${authorData?.lastname}`}></img>
          </div>
          <div className="profile-desc">
            <span className="desc-title">
            {`${authorData?.firstname} ${authorData?.lastname}`} •
              <span
                onClick={toggleFollow}
                style={{ color: isFollowing ? "dodgerblue" : "" }}
              >
                {isFollowing ? "Follow" : "Following"}
              </span>
            </span>
            
            <span className="desc-time">{formatDate(authorData?.lastactive)}</span>
          </div>
        </div>
        <hr />
        <LikeSaveShare articleID = {articleData.indexOf(displayedArticle)}/>
        <hr />
        <div className="article-img">
          <img src={displayedArticle.image} alt="Article" />
        </div>
        <caption>{displayedArticle.caption}</caption>
        <div className="article-desc">
          {displayedArticle.article}
        </div>
        <LikeSaveShare articleID = {articleData.indexOf(displayedArticle)}/>
        <hr />
        <a href="">More from {`${authorData?.firstname} ${authorData?.lastname}`}</a>
        <hr />
        <a onClick={()=>setModal(true)}><u>Report</u></a>
        <hr />
        <a href="">Help</a>

      {modal && <Modal closeModal={setModal}/>}
    </div>
  );
};
