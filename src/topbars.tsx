import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Topbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="topbar">
      <div className="topbar-right">
        <button 
          className="login-button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Topbar;