import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import HeroSection from "./HeroSection";

const Dashboard = () => {
  return (
    <div className="dashboard">
      
      <nav className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link to="/upload">Upload Excel</Link></li>
          <li><Link to="/manual-entry">Manual Data Entry</Link></li>
          <li><Link to="/excel-sheet">Excel Sheet</Link></li>
        </ul>
      </nav>

      <div className="main-content">
        <HeroSection />
      </div>
    </div>
  );
};

export default Dashboard;
