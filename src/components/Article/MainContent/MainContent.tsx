import "./styles/MainContent.css";
import { LikeSaveShare } from "./LikeSaveShare";
import { useState } from "react";

interface Props {
  article_title: string;
  article_desc: string;
  article_img: string;
  article_caption: string;
  article_details: string;
  author_pfp: string;
  author_name: string;
  author_active: number;
}

export const MainContent = (props: Props) => {
  const [isFollowing, setIsFollowing] = useState(true);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="main-content">
      <span className="title">{props.article_title}</span>
      <span className="discription">{props.article_desc}</span>
      <div className="profile">
        <div className="pfp">{props.author_pfp}</div>
        <div className="profile-desc">
          <span className="desc-title">
            {props.author_name} •
            <span
              onClick={toggleFollow}
              style={{ color: isFollowing ? "dodgerblue" : "" }}
            >
              {isFollowing ? "Follow" : "Following"}
            </span>
          </span>
          <span className="desc-time">{props.author_active} hours ago</span>
        </div>
      </div>
      <hr />
      <LikeSaveShare />
      <hr />
      <div className="article-img">
        <img src={props.article_img} alt="Article" />
      </div>
      <caption>{props.article_caption}</caption>
      <div className="article-desc">
        {props.article_details}
      </div>
      <LikeSaveShare />
      <hr />
      <a href="">More from {props.author_name}</a>
      <hr />
      <a href="">Report</a>
      <hr />
      <a href="">Help</a>
    </div>
  );
};
