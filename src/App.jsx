import { Route, Routes, useNavigate } from "react-router-dom";
import { React, useState, useEffect, createContext } from "react";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import axios from './Pages/Utility/axiosConfig';
import Home from "./Pages/Home/Home";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";


export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    setUser(data)
    } catch (error) {
      console.log (error.response?.data?.message || "An error occurred");
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </AppState.Provider> 
  );
}

export default App;
