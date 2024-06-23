import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { EventDetails } from "./pages/EventDetails.tsx";
import "./App.css"; // Import CSS file
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import getDocument from "./firebase/getData"

function App() {
  return (
    <ChakraProvider disableGlobalStyle={true} theme={theme}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event/:name" element={<EventDetails/>}/>
    </Routes>
    <div className="fixed bottom-0 w-full h-20 flex items-center gap-5 p-5" style={{backgroundColor:"#00091a", boxShadow:"0px -2px 7px black"}}>
      <span>Navigation:</span>
      <button className="defaultButton" onClick={()=>{window.open("/","_self")}}>Home</button>
      <button className="defaultButton" onClick= {() => getDocument("events","0HCFKfeAsaD6VjOQA7Vq").then(data =>{
        console.log(data.result?.data());
      })}></button>
      <button className="defaultButton"onClick={()=>{window.open("/event/Leading Your Career","_self")}}>Event</button>
    </div>
    </ChakraProvider>
  );
}
export default App;	