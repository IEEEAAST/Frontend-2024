import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { EventDetails } from "./pages/EventDetails.tsx";
import "./App.css"; // Import CSS file

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/event" element={<EventDetails/>}/>
    </Routes>
  );
}

export default App;