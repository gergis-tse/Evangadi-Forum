import React, { createContext, useState } from "react";
import Home from "./Pages/Home/Home"; // Adjusted path to match your folder structure
import "./App.css"; // Your custom styles (if any)

// Create the context
export const UserState = createContext();

function App() {
  // Define the user state
  const [user, setUser] = useState({ username: "JohnDoe" }); // Example user state

  return (
    <UserState.Provider value={{ user, setUser }}>
      <Home /> {/* Now Home can use UserState context */}
    </UserState.Provider>
  );
}

export default App;
