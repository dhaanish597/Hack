import React from "react";
import Sidebar from "./sidebars";
import Topbar from "./topbars";
import Main from "./Main";
import "./app.css";

const Home: React.FC = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="main-wrapper">
        <Topbar />
        <Main />
      </div>
    </div>
  );
};

export default Home;
