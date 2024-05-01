import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./pages/Header";

import "./App.css"; // Import CSS file

function App() {
  return (
    <>
      {/* Include the Header component */}
      <Header />

      {/* Define the routes */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
