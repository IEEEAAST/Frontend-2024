import { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { EventDetails } from "./pages/EventDetails.tsx";
import { Home } from "./pages/Home";
import { Article } from "./pages/Article";
import "./App.css"; // Import CSS file
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

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
      <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </ChakraProvider>
  );
}

export default App;
