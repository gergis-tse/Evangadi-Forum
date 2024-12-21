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
					<Route
						path="/home"
						element={
							<>
								{/* <Header /> */}
								<Home />
								<Footer />
							</>
						}
					/>
					<Route
						path="/signup"
						element={
							<>
								{/* <Header/> */}
								<Signup />
								<Footer />
							</>
						}
					/>
					<Route
						path="/login"
						element={
							<>
								{/* <Header /> */}
								<Login />
								<Footer />
							</>
						}
					/>
					<Route
						path="/question"
						element={
							<>
								{/* <Header /> */}
								<AskQuestion />
								<Footer />
							</>
						}
					/>
				</Routes>
			</AppState.Provider>
		</>
	);
}

export default App;
