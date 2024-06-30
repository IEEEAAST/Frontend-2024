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
import { Signin } from "./pages/Signin.tsx";
import { Dashboard } from "./pages/Dashboard";
import getUser from "./firebase/auth.js";
import { getAuth } from "firebase/auth";
import { app } from "./firebase/config.js";
import { delay } from "framer-motion";


export const LangContext = createContext({
  lang: "English",
  setLang: (lang: string) => {}
});

export const userContext = createContext<any>(null);

function App() {

  const fetchUser = async () => {
    try {
      const user = await getUser();
      if (user) {
        const docRef = await getDocument("users", user.uid);
        if (!docRef.error && docRef.result) {
          setUserData(docRef.result.data());
        }
      }
    } catch (error) {
      console.error("Error fetching user or user data:", error);
    }
  };

  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("lang");
    return savedLang || "en";
    });
    
    const [userData, setUserData] = useState<any>([])

  useEffect(() => {
    localStorage.setItem("lang", lang);
    delay(fetchUser, 1000);
    fetchUser();
  }, [lang]);


  return (
    <ChakraProvider disableGlobalStyle={true} theme={theme}>
      <LangContext.Provider value={{ lang, setLang }}>
        <LangContext.Provider value = {userData}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/event/:name" element={<EventDetails/>}/>
          <Route path="/article/:name" element={<Article />} />
          <Route path="/mailconfirm" element={<MailDesign />} />
          <Route path="/onboard" element={<Onboarding />} />
          <Route path="/verify" element={<Verifying />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path ="/signin" element = {<Signin />} />
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
      </LangContext.Provider>
    </ChakraProvider>
  );
}

export default App;