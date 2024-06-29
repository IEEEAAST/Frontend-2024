import { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { EventDetails } from "./pages/EventDetails.tsx";
import { Home } from "./pages/Home";
import { Article } from "./pages/Article";
import "./App.css"; // Import CSS file
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import getDocument from "./firebase/getData"
import { MailDesign } from "./pages/MailDesign";
import { Onboarding } from "./pages/Onboarding";
import { Verifying } from "./pages/Verification";
import { SignUp } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";


export const LangContext = createContext({
  lang: "English",
  setLang: (lang: string) => {}
});

function App() {
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("lang");
    return savedLang || "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <ChakraProvider disableGlobalStyle={true} theme={theme}>
      <LangContext.Provider value={{ lang, setLang }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/event/:name" element={<EventDetails/>}/>
          <Route path="/article/:name" element={<Article />} />
          <Route path="/mail2" element={<MailDesign />} />
          <Route path="/onboard" element={<Onboarding />} />
          <Route path="/verify" element={<Verifying />} />
          <Route path="/Signup" element={<SignUp />} />
        </Routes>

        <div className="fixed bottom-0 w-full h-20 flex items-center gap-5 p-5 z-50" style={{backgroundColor:"#00091a", boxShadow:"0px -2px 7px black"}}>
          <span>Navigation:</span>
          <button className="defaultButton" onClick={() => getDocument("events","0HCFKfeAsaD6VjOQA7Vq").then(data => {
            console.log(data.result?.data());
          })}>Test API</button>
          <button className="defaultButton" onClick={() => { window.open("/", "_self") }}>Home</button>
          <button className="defaultButton" onClick={() => { window.open("/home", "_self") }}>Dashboard</button>
          <button className="defaultButton" onClick={() => { window.open("/event/Leading Your Career", "_self") }}>Event</button>
          <button className="defaultButton" onClick={() => { window.open("/article/ArticleName", "_self") }}>Article</button>
        </div>
      </LangContext.Provider>
    </ChakraProvider>
  );
}

export default App;