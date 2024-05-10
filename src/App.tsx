import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Article } from "./pages/Article";
import "./App.css"; // Import CSS file

function App() {
  return (
    <Routes>
      <Route path="/" element={<Article />} />
    </Routes>
  );
}

export default App;