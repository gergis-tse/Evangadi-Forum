import React, { useState } from 'react'
import About from '../../Components/About/About';
import Login from '../Login/Login';
import Signup from '../SignUp/Signup';
import styles from "./Landing.module.css";



const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin((prev) => !prev); // Toggle between Login and Signup
  }
  return (
    <div className={styles.container}>
        <div className={styles.left}>
          {isLogin ? <Login onToggle={handleToggle}/> : <Signup onToggle={handleToggle}/>}
        </div>
      <div className={styles.right}>
        <About />
      </div>
    </div>
  );
};

export default Landing;





