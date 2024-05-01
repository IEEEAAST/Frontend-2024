import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./pages/Header";

import "./App.css"; // Import CSS file
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
