import { Header } from "../components/Article/Header/Header.tsx";
import { Footer } from "../components/Article/Footer/Footer.tsx";
import { MainContent } from "../components/Article/MainContent/MainContent.tsx";
import { useState} from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from "../components/common/navbar.tsx"


export const Article = () => {
  let { name } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  console.log("title",name)

  return (
    <>
      <NavBar onSearch={handleSearch}/>
      {/* <Header onSearch={handleSearch}/> */}
      <MainContent searchQuery={searchQuery} articleName={name}/>
      <Footer />
    </>
  );
};
