import More from "../../../assets/more-ellipsis-white.png";
import React from "react";
import ArticleData from "../../../interfaces/ArticleData.js";
import { LikeButton } from "../../common/LikeButton.js";
import {BookMarkButton} from "../../common/BookMarkButton.tsx"
import "./styles/MainContent.css";

interface LikeSaveShareProps {
  article: ArticleData;
}

export const LikeSaveShare: React.FC<LikeSaveShareProps> = ({ article }) => {
  return (
    <div style={{ display: 'flex', justifyContent:'space-between', alignItems: 'center', padding: '10px' }}>
      <LikeButton item={article} type="article"/>
      <div className="flex gap-2">
        <div>
          <BookMarkButton item={article} />
        </div>
        <div>
          <img
            src={More}
            alt="More"
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
};
