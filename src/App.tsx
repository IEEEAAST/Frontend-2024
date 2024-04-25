import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { EventDetails } from "./pages/EventDetails.tsx";
import "./App.css"; // Import CSS file
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

function App() {
  return (
    <ChakraProvider disableGlobalStyle={true} theme={theme}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:name" element={<EventDetails/>}/>
    </Routes>
    </ChakraProvider>
  );
}

export default App;