import "../src/Styles/App.css";
import { Home } from "./Pages/Home";
import Deals from "./Pages/Deals";
import { Categories } from "./Pages/Categories";
import { About } from "./Pages/About";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import LogoutButton from "./Pages/Logout";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Router>
        <h1>Black Friday</h1>
        <nav className="NavBar">
          <div className="links">
            {!isLoggedIn ? (
              <>
                <Link to="/Register">Register</Link>
                <Link to="/Login">Login</Link>
              </>
            ) : (
              <span>Welcome, User!</span>
            )}
            <Link to="/">Home</Link>
            <Link to="/Deals">Deals</Link>
            <Link to="/Categories">Categories</Link>
            <Link to="/About">About</Link>
          </div>

          <div className="logoutBtn">
            {isLoggedIn && <LogoutButton setIsLoggedIn={setIsLoggedIn} />}
          </div>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
