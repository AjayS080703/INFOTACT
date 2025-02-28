import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadExcel from "./components/UploadExcel";
import ManualDataEntry from "./components/ManualDataEntry";
import ExcelSheet from "./components/excelSheet";
import Dashboard from "./components/Dashboard";
import Chart2D from "./components/Chart2D";
import HeroSection from "./components/HeroSection";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./styles/Dashboard.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={darkMode ? "dark-mode" : ""}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadExcel />} />
          <Route path="/manual-entry" element={<ManualDataEntry />} />
          <Route path="/excel-sheet" element={<ExcelSheet />} />
          <Route path="/chart2d" element={<Chart2D />} />
          <Route path="/herosection" element={<HeroSection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
