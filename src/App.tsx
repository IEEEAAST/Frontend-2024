import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css"; // Import CSS file
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { MailDesign } from "./pages/MailDesign";
import { Onboarding } from "./pages/Onboarding";
import { Verifying } from "./pages/Verification";
import { SignUp } from "./pages/Signup";

function App() {
  return (
    <ChakraProvider disableGlobalStyle={true} theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mail2" element={<MailDesign />} />
        <Route path="/onboard" element={<Onboarding />} />
        <Route path="/verify" element={<Verifying />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
