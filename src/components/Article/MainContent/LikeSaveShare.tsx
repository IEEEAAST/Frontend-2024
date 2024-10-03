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
import { LikeButton } from "../../common/LikeButton.js";

interface LikeSaveShareProps {
  article: ArticleData;
}

export const LikeSaveShare: React.FC<LikeSaveShareProps> = ({ article }) => {
  const { userData, userId, setUserData } = useContext(UserContext);
  const [localLikedBy, setLocalLikedBy] = useState<string[]>(article.likedBy || []);
  const [isAnimating, setIsAnimating] = useState(false); // Track animation state

  // Effect to update local state if the article's likedBy changes
  useEffect(() => {
    setLocalLikedBy(article.likedBy || []);
  }, [article.likedBy]);

  const handleLikeClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const liked = userId && localLikedBy.includes(userId);

    if (article.id && userData && userId) {
      // Trigger the animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);

      // Optimistically update the local likedBy state
      const updatedLikedBy = liked
        ? localLikedBy.filter((user) => user !== userId) // Remove user from likedBy
        : [...localLikedBy, userId]; // Add user to likedBy

      setLocalLikedBy(updatedLikedBy); // Update the UI immediately

      // Now send the update to Firebase
      toggleLike(article, userData, userId, "article", setUserData);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <LikeButton item={article} type="article"/>
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
