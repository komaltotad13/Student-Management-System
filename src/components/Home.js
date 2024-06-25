import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-buttons">
          <button>Home</button>
          <button>About</button>
          <button>Contact</button>
        </div>
        <div className="login-dropdown">
          <button className="dropbtn">Login</button>
          <div className="dropdown-content">
            <Link to="/login/admin">Admin</Link>
            <Link to="/login/teacher">Teacher</Link>
            <Link to="/login/student">Student</Link>
          </div>
        </div>
      </nav>
      <div className="content">
        <h1>Welcome to Our School</h1>
        <p>
          Discover a world of learning and growth at our esteemed institution.
        </p>
        <button className="cta-button">Learn More</button>
      </div>
    </div>
  );
};

export default Home;
