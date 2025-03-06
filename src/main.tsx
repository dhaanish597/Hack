import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const Main: React.FC = () => {
  return (
    <main className="main-content">
      <h1>Welcome to the Dashboard</h1>
      {/* Add your main content here */}
    </main>
  );
};

export default Main;