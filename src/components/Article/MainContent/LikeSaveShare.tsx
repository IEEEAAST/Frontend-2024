import "./styles/MainContent.css";
import WhiteSparkles from "../../../assets/sparkles-white.png";
import OrangeSparkles from "../../../assets/sparkles-orange.png";
import Bookmark from "../../../assets/bookmark-ribbon-white.png";
import FilledBookmark from "../../../assets/bookmark-ribbon-filled-white.png";
import More from "../../../assets/more-ellipsis-white.png";
import { useState } from "react";

export const LikeSaveShare = () => {
  const [like, setLike] = useState(true);
  const [save, setSave] = useState(true);

  const toggleLike = () => {
    setLike(!like);
  };

  const toggleSave = () => {
    setSave(!save);
  };

  return (
    <div className="like-save-share">
      <div className="like">
        <img
          src={like ? WhiteSparkles : OrangeSparkles}
          alt="Sparkles"
          onClick={toggleLike}
        />
        <span>30</span>
      </div>
      <div className="save-share">
        <img
          src={save ? Bookmark : FilledBookmark}
          alt="Bookmark"
          onClick={toggleSave}
        />
        <img src={More} alt="More" />
      </div>
    </div>
  );
};
