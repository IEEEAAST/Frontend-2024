import React, { useState, useEffect, useContext } from "react";
import WhiteSparkles from "../../assets/sparkles-white.png";
import OrangeSparkles from "../../assets/sparkles-orange.png";
import { UserContext } from "../../App.js";
import { toggleLike } from "../../utils";
import ArticleData from "../../interfaces/ArticleData";
import { EventData } from "../../interfaces/EventData";

interface LikeButtonProps {
  item: ArticleData | EventData;
  type: "article" | "event";
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ item, type, className }) => {
  const { userData, userId, setUserData } = useContext(UserContext);
  const [localLikedBy, setLocalLikedBy] = useState<string[]>(item.likedBy || []);
  const [isAnimating, setIsAnimating] = useState(false);
  const [optimisticUpdate, setOptimisticUpdate] = useState(false);

  // Effect to update local state when item.likedBy changes, but only if not in optimistic update
  useEffect(() => {
    if (!optimisticUpdate) {
      setLocalLikedBy(item.likedBy || []);
    }
  }, [item.likedBy, optimisticUpdate]);

  const handleLikeClick = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    const liked = userId && localLikedBy.includes(userId);

    if (item.id && userData && userId) {
      // Start animation
      setIsAnimating(true);

      // Optimistically update localLikedBy
      const updatedLikedBy = liked
        ? localLikedBy.filter((user) => user !== userId)
        : [...localLikedBy, userId];

      setLocalLikedBy(updatedLikedBy);
      setOptimisticUpdate(true); // Begin optimistic update state

      // Delay the end of the animation for smoother effect
      setTimeout(() => setIsAnimating(false), 500);

      try {
        // Send the update to Firebase
        await toggleLike(item, userData, userId, type, setUserData);
      } catch (error) {
        console.error("Error updating like:", error);

        // If an error occurs, revert the optimistic update
        const revertedLikedBy = liked
          ? [...localLikedBy, userId] // Re-add if unliking failed
          : localLikedBy.filter((user) => user !== userId); // Remove if liking failed

        setLocalLikedBy(revertedLikedBy);
      } finally {
        setOptimisticUpdate(false); // End optimistic update state
      }
    }
  };

  return (
    <div className={`flex gap-1 items-center w-20 ${className}`}>
      <img
        className="w-8 transition-transform duration-100 ease-linear absolute"
        src={userId && localLikedBy.includes(userId) ? OrangeSparkles : WhiteSparkles}
        onClick={handleLikeClick}
      />
      <img
        className={`w-8 transition-transform duration-100 ease-linear relative cursor-pointer ${
          isAnimating && "animate-ping"
        }`}
        src={userId && localLikedBy.includes(userId) ? OrangeSparkles : WhiteSparkles}
        onClick={handleLikeClick}
      />
      <p className={userId && localLikedBy.includes(userId) ? "text-[#E7AE79]" : "text-white"}>
        {localLikedBy.length}
      </p>
    </div>
  );
};
