import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import Fetch from "./components/Fetch";
import Favourite from "./components/Favourite";

function App() {
  return (
    <>
      <div className="navbar">
        <NavLink
          style={{ color: "white", textDecoration: "none", padding: "2vh 1vw" }}
          to="/"
        >
          {" "}
          Home
        </NavLink>
        <NavLink
          style={{ color: 'white', textDecoration: "none", padding: "2vh 1vw" }}
          to="/favourite"
        >
          {" "}
          Favourite
        </NavLink>
      </div>

      <Routes>
        <Route path="/" element={<Fetch />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
    </>
  );
}

export default App;
