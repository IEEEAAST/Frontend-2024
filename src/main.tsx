import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import ScrollToTop from "./components/common/ScrollToTop.tsx";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop/>
      <ChakraProvider disableGlobalStyle={true} theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <SpeedInsights/>
        <Analytics/>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
