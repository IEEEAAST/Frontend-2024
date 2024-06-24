import { Route, Routes } from "react-router-dom";
import {Home} from "./pages/Home";
import "./App.css"; // Import CSS file
import { ChakraProvider } from "@chakra-ui/react";
import { LangProvider } from './components/common/LangContext';
import theme from "./theme";

function App() {
  
  return (
    <ChakraProvider disableGlobalStyle={true} theme={theme}>
      <LangProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </LangProvider>
    </ChakraProvider>
  );
}

export default App;
