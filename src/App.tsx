import { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { EventDetails } from "./pages/EventDetails";
import { Home } from "./pages/Home";
import { Article } from "./pages/Article";
import "./App.css"; // Import CSS file
import { ChakraProvider, Spinner } from '@chakra-ui/react'
import theme from './theme'
import getDocument from "./firebase/getData"
import { MailDesign } from "./pages/MailDesign";
import { Onboarding } from "./pages/Onboarding";
import { Verifying } from "./pages/Verification";
import { SignUp } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { WriteArticle } from "./pages/WriteArticle";
import { ViewAllArticles } from "./pages/ViewAllArticles";
import { Admin } from "./pages/Admin";
import getUser from "./firebase/auth";
import { Profile } from "./pages/Profile";
import UserData from "./interfaces/userData";
import { ViewAllEvents } from "./pages/ViewAllEvents";
import { NavBar } from "./components/common/navbar";

export const UserContext = createContext<{
  [x: string]: any;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  userData: null,
  setUserData: () => {},
  userId: null,
  setUserId: () => {}
});

export const AppConfigContext = createContext<{
  appConfig: {
    contactEmail: string | null;
    headsCarouselSettings: any | null;
    recruitingLink: string | null;
  };
}>({
  appConfig: {
    contactEmail: null,
    headsCarouselSettings: null,
    recruitingLink: null
  }
});

function App() {

  const [userData, setUserData] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [appConfig, setAppConfig] = useState({
    contactEmail: null as string | null,
    headsCarouselSettings: null as any | null,
    recruitingLink: null as string | null,
  });

  const fetchUser = async () => {
    try {
      const user = await getUser();
      if (user) {
        const docRef = await getDocument("users", user.uid);
        if (!docRef.error && docRef.result) {
          setUserData(docRef.result.data());
          setUserId(user.uid);
        }
        setLoading(false);
      } else { setLoading(false) }
    } catch (error) {
      console.error("Error fetching user or user data:", error);
    }
  };

  const fetchAppConfig = async () => {
    try {
      const contactEmail = (await getDocument("adminSettings", "contactEmail"))
      const headsCarouselSettings = await getDocument("adminSettings", "headsCarouselSettings");
      const recruitment = await getDocument("adminSettings", "recruitment");
      setAppConfig({
        contactEmail: contactEmail.result?.data()?.email,
        headsCarouselSettings: headsCarouselSettings.result?.data(),
        recruitingLink: recruitment.result?.data()?.formlink
      });
    } catch (error) {
      console.error("Error fetching app config:", error);
    }
  }
  
  useEffect(() => {
    fetchUser();
    fetchAppConfig();
  }, []);

  return loading? <div className="h-screen flex justify-center items-center"><Spinner size={"xl"} className="flex "/></div> : (
    <ChakraProvider disableGlobalStyle={true} theme={theme}>
      <UserContext.Provider value={{ userData, setUserData, userId, setUserId}}>
        <AppConfigContext.Provider value={{appConfig}}>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Dashboard />} />
            <Route path="/event/:name" element={<EventDetails />} />
            <Route path="/article/:name" element={<Article />} />
            <Route path="/write" element={<WriteArticle />} />
            <Route path="/mailconfirm" element={<MailDesign />} />
            <Route path="/onboard" element={<Onboarding />} />
            <Route path="/verify" element={<Verifying />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/Profile/:name" element = {<Profile />} />
            <Route path="/articles" element = {<ViewAllArticles />} />
            <Route path="/events" element = {<ViewAllEvents/>}></Route>
            <Route path="/admin" element = {<Admin/>}></Route>
          </Routes>
        </AppConfigContext.Provider>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
