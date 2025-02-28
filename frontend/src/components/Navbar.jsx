import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Excel Data Visualizer</h1>
      <div className="auth-buttons">
        <Link to="/register" className="btn">Register</Link>
        <Link to="/login" className="btn login-btn">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
