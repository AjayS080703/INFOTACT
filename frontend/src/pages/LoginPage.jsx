import React, { useState } from "react";
import "../styles/LoginPage.css";


const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login Successful!");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="page-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} required />
          <button className="btn primary" type="submit">Login</button>
        </form>
        <p className="switch-auth">
          No account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
