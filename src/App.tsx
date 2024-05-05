import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css"; // Import CSS file
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { SignUp } from "./pages/Signup";

function App() {
  return (
    <ChakraProvider disableGlobalStyle={true} theme={theme}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<SignUp />} />
    </Routes>
    </ChakraProvider>
  );
}

export default App;