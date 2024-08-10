import { Route, Routes } from "react-router-dom";
import "./App.css";
import Fetch from "./components/Fetch";
import Favourite from "./components/Favourite";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Fetch />} />
      <Route path="/favourite" element={<Favourite />} />
    </Routes>
    </>
  );
}

export default App;
