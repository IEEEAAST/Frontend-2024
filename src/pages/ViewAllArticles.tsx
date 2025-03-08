import { Spinner } from "@chakra-ui/react";
import "./styles/Dashboard.css";
import subscribeToCollection from "../firebase/subscribeToCollection.js"; // Import the new function
import getDocument from "../firebase/getData.js";
import { useEffect, useState, useContext } from "react";
import { UserContext } from '../App';
import UserData from "../interfaces/userData.js";
import sort from "../assets/sort.png";
import sortup from "../assets/sortup.png";
import sortdown from "../assets/sortdown.png";
import ArticleCard from "../components/Article/Card/ArticleCard.tsx";
import ArticleData from "../interfaces/ArticleData.tsx";

export const ViewAllArticles = () => {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [authors, setAuthors] = useState<{ [key: string]: UserData }>({});
  const [filter, setFilter] = useState("date");
  const { userData } = useContext(UserContext);

  const getAuthorNamesFromSet = async (authorIdsSet: Set<string>): Promise<void> => {
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

    // Sorting logic based on the filter
    switch (filter) {
      case "date":
        sortedArticles.sort((a, b) => b.publishdate.seconds - a.publishdate.seconds);
        break;
      case "date-reverse":
        sortedArticles.sort((a, b) => a.publishdate.seconds - b.publishdate.seconds);
        break;
      case "topic":
        sortedArticles.sort((a, b) => (b.topic || "Article").localeCompare(a.topic || "Article"));
        break;
      case "topic-reverse":
        sortedArticles.sort((a, b) => (a.topic || "Article").localeCompare(b.topic || "Article"));
        break;
      case "likes":
        sortedArticles.sort((a, b) => (b.likedBy || []).length - (a.likedBy || []).length);
        break;
      case "likes-reverse":
        sortedArticles.sort((a, b) => (a.likedBy || []).length - (b.likedBy || []).length);
        break;
    }
    setArticles(sortedArticles); // Update state with the sorted articles
  };

  useEffect(() => {
    const unsubscribe = subscribeToCollection("articles", ({ result, ids, error }: { result: any, ids: string[], error: any }) => {
      if (error) {
        console.error("Error fetching articles: ", error);
        return;
      }

      if (result && ids) {
        const newarticles = (result as ArticleData[]).map((article, index) => ({
          ...article,
          id: ids ? ids[index] : null, // Set the id from ids if not null
          liked: userData?.likes?.articles?.includes(ids ? ids[index] : "") || false, // Set liked property based on user data
        }));
        setArticles(newarticles.sort((a, b) => b.publishdate.seconds - a.publishdate.seconds));
        const authorIds = newarticles.map((article) => article.author);
        getAuthorNamesFromSet(new Set(authorIds));
      }
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, [userData]); // Ensure to re-run the effect when userData changes

  if (!articles || articles.length === 0) {
    return (
      <>
        <div className="flex items-center justify-center w-full h-[99vh]"><Spinner size="xl" /></div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center bg-[#000B21] text-white header mb-6 pt-4 md:pt-12 lg:pt-16">
      <div className="h-[150px] md:h-[150px] w-full"></div>
      <div className="w-full px-4 lg:px-[89px]">
        <div className="flex justify-between items-center">
          <h2 className="text-white md:text-[32px] lg:text-[45px] font-bold">All Articles</h2>

          {/* Sorting buttons */}
          <button className="w-1/3 md:w-1/4 lg:w-1/6 border-b border-[#141E32] flex justify-between items-center relative h-12 md:h-14" onClick={() => { changeFilter("date") }}>
            Date
            <div className="relative w-5 my-2">
              <img src={sortup} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "date" ? 'opacity-100' : 'opacity-0'}`} />
              <img src={sortdown} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "date-reverse" ? 'opacity-100' : 'opacity-0'}`} />
              <img src={sort} className={`absolute inset-0 w-full transition-opacity duration-300 ${!(filter.includes("date")) ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${filter.includes("date") ? 'w-full' : 'w-0'} h-[1px] bg-white transition-all`} />
          </button>
          <button className="w-1/3 md:w-1/4 lg:w-1/6 border-b border-[#141E32] flex justify-between items-center relative h-12 md:h-14" onClick={() => { changeFilter("topic") }}>
            Topic
            <div className="relative w-5 my-2">
              <img src={sortup} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "topic" ? 'opacity-100' : 'opacity-0'}`} />
              <img src={sortdown} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "topic-reverse" ? 'opacity-100' : 'opacity-0'}`} />
              <img src={sort} className={`absolute inset-0 w-full transition-opacity duration-300 ${!(filter.includes("topic")) ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${(filter == 'topic' || filter == 'topic-reverse') ? 'w-full' : 'w-0'} h-[1px] bg-white transition-all`} />
          </button>
          <button className="w-1/3 md:w-1/4 lg:w-1/6 border-b border-[#141E32] flex justify-between items-center relative h-12 md:h-14" onClick={() => { changeFilter("likes") }}>
            Likes
            <div className="relative w-5 my-2">
              <img src={sortup} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "likes" ? 'opacity-100' : 'opacity-0'}`} />
              <img src={sortdown} className={`absolute inset-0 w-full transition-opacity duration-300 ${filter === "likes-reverse" ? 'opacity-100' : 'opacity-0'}`} />
              <img src={sort} className={`absolute inset-0 w-full transition-opacity duration-300 ${!(filter.includes("likes")) ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${(filter.includes('likes')) ? 'w-full' : 'w-0'} h-[1px] bg-white transition-all`} />
          </button>
        </div>

        <div className="w-full px-4">
          <div className="mt-[20px]  md:mt-[30px]  lg:mt-[59px] flex flex-col gap-[30px] md:gap-[30px] lg:gap-[58px]">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id || index}
                article={article}
                author={authors[article.author]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
