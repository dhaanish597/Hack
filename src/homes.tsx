import React from "react";
import Topbar from "./topbars";
import Main from "./components/Main";
import "./app.css";

const Home: React.FC = () => {
  return (
    <div className="main-wrapper">
      <Topbar />
      <Main />
    </div>
  );
};

export default Home;