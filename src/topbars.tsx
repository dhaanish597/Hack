import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./app.css";

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <header className="top-bar">
      <div className="auth-buttons">
        {!isLoginPage && (
          <>
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="signup-btn" onClick={() => navigate("/login")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Topbar;