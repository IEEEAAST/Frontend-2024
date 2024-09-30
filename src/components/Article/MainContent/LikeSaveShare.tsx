import "./styles/MainContent.css";
import WhiteSparkles from "../../../assets/sparkles-white.png";
import OrangeSparkles from "../../../assets/sparkles-orange.png";
import Bookmark from "../../../assets/bookmark-ribbon-white.png";
import FilledBookmark from "../../../assets/bookmark-ribbon-filled-white.png";
import More from "../../../assets/more-ellipsis-white.png";
import React, { useState, useEffect, useContext } from "react";
import ArticleData from "../../../interfaces/ArticleData.js";
import { UserContext } from "../../../App.js";
import { toggleLike } from "../../../utils";

interface LikeSaveShareProps {
  article: ArticleData;
}

export const LikeSaveShare: React.FC<LikeSaveShareProps> = ({article}) => {
  const {userData,userId,setUserData} = useContext(UserContext);
  console.log("TEST LOG",article);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={(userId&&article.likedBy?.includes(userId)) ? WhiteSparkles : OrangeSparkles}
          alt="Sparkles"
          style={{ cursor: 'pointer', marginRight: '10px' }}
          onClick={()=>{if(userId&&userData)toggleLike(article, userData, userId, "article",setUserData)}}
        />
        <span style={{ color: 'white' }}>{article.likedBy?.length||0}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={true ? Bookmark : FilledBookmark} // add condition later
          alt="Bookmark"
          style={{ cursor: 'pointer', marginRight: '10px' }}
        />
        <img
          src={More}
          alt="More"
          style={{ cursor: 'pointer' }}
        />
      </div>
  </div>
  );
};
