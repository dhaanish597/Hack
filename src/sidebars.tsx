import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaSeedling, FaChartLine, FaUsers, FaRobot } from "react-icons/fa";
import "./app.css";
import { Fa1, FaBots } from "react-icons/fa6";

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <div className="logo">
        <img src="/assets/logo.png" alt="Logo" className="logo-img" />
        <h2>AgriTech</h2>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/home">
            <FaHome />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/ChatBot">
            <FaRobot />
            <span>ChatBot</span>
          </Link>
        </li>
        <li>
          <Link to="/soil-prediction">
            <FaSeedling />
            <span>Soil Prediction</span>
          </Link>
        </li>
        <li>
          <Link to="/analytics">
            <FaChartLine />
            <span>Analytics</span>
          </Link>
        </li>
        <li>
          <Link to="/community">
            <FaUsers />
            <span>Community</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
