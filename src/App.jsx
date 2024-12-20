import { Route, Routes, useNavigate } from "react-router-dom";
import { React, useState, useEffect, createContext } from "react";
import Login from "./Pages/Login/Login";
import axios from "./Pages/Utility/axiosConfig";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import AskQuestion from "./Pages/Question/AskQuestion/AskQuestion";
import Signup from "./Pages/Signup";

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
      setUser(data);
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred");

      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <AppState.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/question" element={<AskQuestion />} />
        </Routes>
        <Footer />
      </AppState.Provider>
      
    </>
  );
}

export default App;
