import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./sidebars";
import Home from "./homes";
import Login from "./login";
import Profile from "./profile";
import CropFertilizerRecommendation from "./soilPrediction";
import ChatBot from "./chatBot";
import Community from "./Community";
import Analytics from "./Analytics";
//import Analysis from "./Analysis";
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
            <Route path="/soil-prediction" element={<CropFertilizerRecommendation />} />
            <Route path="/chatBot" element={<ChatBot />} />
            <Route path="/community" element={<Community />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
