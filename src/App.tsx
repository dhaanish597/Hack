import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./sidebars";
import Home from "./homes";
import Login from "./login";
import Profile from "./profile";
import "./app.css";
//import SoilPrediction from "./SoilPrediction";
//import Analytics from "./Analytics";
//import Community from "./Community";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            {//<Route path="/soil-prediction" element={<SoilPrediction />} />
            //<Route path="/analytics" element={<Analytics />} />
            //<Route path="/community" element={<Community />} />
            }
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
