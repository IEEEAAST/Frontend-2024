import { MainContent } from "../components/Article/MainContent/MainContent.tsx";
import { useParams } from 'react-router-dom';


export const Article = () => {
  const { name } = useParams();
  console.log("title",name)

  return (
    <>
      <MainContent  articleName={name||""}/>
    </>
  );
};
