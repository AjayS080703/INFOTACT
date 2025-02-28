import React, { useState } from "react";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        {!showGuide ? (
          <>
            <h1>AI-Powered Excel Data Dashboard</h1>
            <p>Analyze and visualize data with ease.</p>
            <button className="cta-button" onClick={() => setShowGuide(true)}>
              Get Started
            </button>
          </>
        ) : (
          <div className="guidance">
            <h2>How to Use This Tool</h2>
            <ol>
              <li><strong>Upload Excel Data:</strong> Click the "Upload" button and select your Excel file.</li>
              <li><strong>Manually Enter Data:</strong> Use the table to input values and modify them as needed.</li>
              <li><strong>Save Data:</strong> Click "Save" to store the data securely in the database.</li>
              <li><strong>Generate 2D Graph:</strong> Click "Generate Graph" to visualize the data instantly.</li>
            </ol>
            <button className="cta-button" onClick={() => setShowGuide(false)}>
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
