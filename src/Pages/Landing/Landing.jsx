import React, { useContext } from "react";
import "./landing.css";
import Login from "../Login/Login";
import Signup from "../Signup";
import { AppState } from "../../App";
function Landing() {
    const { isLogin,setIsLogin } = useContext(AppState)
  return (
    <div className="app-container">
      {/* About Section */}
      <div className="about-section">
        <h2>About Evangadi Networks</h2>
        <p>
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <button className="how-it-works-btn">HOW IT WORKS</button>
      </div>
      <div className="form-container">
        <div className="form-box">{isLogin ? <Login /> : <Signup />}</div>
      </div>
    </div>
  );
}

export default Landing;
