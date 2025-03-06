import React from "react";
import { FaHome, FaUser, FaSeedling, FaChartLine, FaUsers } from "react-icons/fa";
import "./app.css";

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <div className="logo">
        <img src="/assets/logo.png" alt="Logo" className="logo-img" />
        <h2>AgriTech</h2>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/home">
            <FaHome />
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/profile">
            <FaUser />
            <span>Profile</span>
          </a>
        </li>
        <li>
          <a href="/soil-prediction">
            <FaSeedling />
            <span>Soil Prediction</span>
          </a>
        </li>
        <li>
          <a href="/analytics">
            <FaChartLine />
            <span>Analytics</span>
          </a>
        </li>
        <li>
          <a href="/community">
            <FaUsers />
            <span>Community</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
