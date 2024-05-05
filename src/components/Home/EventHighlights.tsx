import "./styles/EventHighlights.css";

interface EventHighlights {
  imgSrc: string;
}

const EventHighlights = ({ imgSrc }: EventHighlights) => {
  return (
    <div className="event-highlights">
      <img src={imgSrc} alt="" />
    </div>
  );
};

export default EventHighlights;
