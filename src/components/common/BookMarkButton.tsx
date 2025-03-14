/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from "react";
import Bookmark from "../../assets/bookmark-ribbon-white.png";
import FilledBookmark from "../../assets/bookmark-ribbon-filled-white.png";
import { UserContext } from "../../App.js";
import { toggleBookMark } from "../../utils.js";
import ArticleData from "../../interfaces/ArticleData";
import UserData from "../../interfaces/userData.js";
import { Tooltip } from '@chakra-ui/react'
import { auth } from "../../firebase/config.js";

interface BookMarkButtonProps {
  item: ArticleData;
  className?: string;
}

export const BookMarkButton: React.FC<BookMarkButtonProps> = ({ item, className }) => {
  // Get user data from context
  const { userData, userId, setUserData } = useContext(UserContext) as {
    userData: UserData;
    userId: string;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  };
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  useEffect(() => {
    if (auth.currentUser) {
      setIsEmailVerified(auth.currentUser.emailVerified);
    }
  }, [auth.currentUser]);

  // Ensure bookmarks exist before reading them
  const initialBookMarks: string[] = userData?.bookmarks?.articles ?? [];

  const [bookMarks, setBookMarks] = useState<string[]>(initialBookMarks);
  const [optimisticUpdate, setOptimisticUpdate] = useState<boolean>(false);

  // Sync local state when userData changes (but only if not in optimistic update)
  useEffect(() => {
    if (!optimisticUpdate) {
      setBookMarks(userData?.bookmarks?.articles ?? []);
    }
  }, [userData?.bookmarks?.articles, optimisticUpdate]);

  const handleBookmarkClick = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      window.location.href = "/signin";
      return;
    }
    if(!isEmailVerified) return;

    let isCurrentlyBookmarked: boolean;

    if(item.id)
      isCurrentlyBookmarked = bookMarks.includes(item.id);

    // Optimistically update the UI instantly
    setBookMarks((prevBookMarks: any) =>
      isCurrentlyBookmarked ? prevBookMarks.filter((id:string) => id !== item.id) : [...prevBookMarks, item.id]
    );

    // Optimistically update `userData`
    setUserData((prevUserData: any) => ({
      ...prevUserData,
      bookmarks: {
        ...prevUserData.bookmarks,
        articles: isCurrentlyBookmarked
          ? prevUserData.bookmarks.articles.filter((id: string) => id !== item.id)
          : [...prevUserData.bookmarks.articles, item.id],
      },
    }));

    setOptimisticUpdate(true);

    try {
      // Update in Firebase
      await toggleBookMark(item, userData, userId, setUserData);
    } catch (error) {
      console.error("Error updating bookmarks:", error);

      // If Firebase update fails, revert the UI update
      setBookMarks((prevBookMarks?: any) =>
        isCurrentlyBookmarked ? [...prevBookMarks, item.id] : prevBookMarks.filter((id: string) => id !== item.id)
      );
    } finally {
      setOptimisticUpdate(false);
    }
  };

  const bookmarkContent = (
    <div className={`flex gap-1 items-center ${className}`}>
      <img
        className={`transition-transform duration-100 ease-linear ${userId ? 'hover:scale-125 cursor-pointer' : 'cursor-not-allowed opacity-25'}`}
        src={item.id && bookMarks.includes(item?.id) ? FilledBookmark : Bookmark}
        onClick={handleBookmarkClick}
        alt="Bookmark"
      />
    </div>
  );

  return userId ? bookmarkContent : (
    <Tooltip label={userId ? "Verify your email to bookmark posts!":"Sign in to bookmark posts!" } placement="top">
      {bookmarkContent}
    </Tooltip>
  );
};
