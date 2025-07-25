import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const toggleForm = () => {
    setIsActive(!isActive);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    navigate("/index.html");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    // Add signup logic here
  };

  return (
    <div className="login-body">
      <div className={`login-container ${isActive ? "active" : ""}`} id="login-container">
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fa-brands fa-google"></i></a>
              <a href="#" className="social"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit" className="sign-up-btn">
              Sign Up
            </button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fa-brands fa-google"></i></a>
              <a href="#" className="social"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button type="submit" className="sign-in-btn">
              Sign In
            </button>
          </form>
        </div>

        <div className="toggle-login-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <button onClick={toggleForm} className="toggle-btn">
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all site features</p>
              <button onClick={toggleForm} className="toggle-btn">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
