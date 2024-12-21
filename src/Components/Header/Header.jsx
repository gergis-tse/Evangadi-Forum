import React, { useState, useEffect } from "react";
import logo from "../../assets/Images/logo.png";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Pages/Utility/axiosConfig";
const Header = () => {
  const [userDatas, setUserDatas] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);

  const handleCheck = async () => {
    if (!token) return;
    try {
      const { data } = await api.get("users/check", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserDatas(data);
      console.log("user data", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    handleCheck();
    console.log(userDatas);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserDatas({});
    navigate("/");
  };
  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.HeaderWrapper}>
        <div className={styles.logo}>
          <Link to={token ? `/home` : `/`}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.RightWrapper}>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="#">How it works</Link>
            </li>
            <li onClick={handleLogout}>
              <button className={styles.logout} onClick={handleLogout}>
                {token ? "Logout" : "Sign Up"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
