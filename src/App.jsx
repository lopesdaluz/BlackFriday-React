import "./App.css";
import { Home } from "./Pages/Home";
import { Deals } from "./Pages/Deals";
import { Categories } from "./Pages/Categories";
import { About } from "./Pages/About";
import { Login } from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Black Friday</h1>
        <nav className="NavBar">
          <div className="links">
            <Link to="Login">Login</Link>
            <Link to="Home">Home</Link>
            <Link to="Deals">Deals</Link>
            <Link to="Categories">Categories</Link>
            <Link to="About">About</Link>
          </div>
          <div className="logoutBtn">
            <button>Logout</button>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
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
