import { Route, Routes, useNavigate } from "react-router-dom";
import { React, useState, useEffect, createContext } from "react";
import Login from "./Pages/Login/Login";
import AskQuestion from "./Pages/Question/AskQuestion/AskQuestion";
import Signup from "./Pages/Signup";
import Landing from "./Pages/Landing/Landing";
import axiosBase from "./utility/axios";
import About from "./Components/About/About";
export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function checkUser() {
    try {
      const { data } = await axiosBase.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred");

      // navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/About" element={<About/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/question" element={<AskQuestion />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;
