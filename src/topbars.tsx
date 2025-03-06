import React from "react";
import "./app.css";

const Topbar: React.FC = () => {
  return (
    <header className="top-bar">
      <div className="auth-buttons">
        <button className="login-btn" onClick={() => (window.location.href = "/login")}>
          Login
        </button>
        <button className="signup-btn" onClick={() => (window.location.href = "/signup")}>
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Topbar;
