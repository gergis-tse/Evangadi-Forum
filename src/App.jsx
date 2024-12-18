import {  createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Test from "./Pages/Test";
import AskQuestion from "./Pages/Question/AskQuestion/AskQuestion";

export const UserState = createContext();
function App() {
  return (
    <>
      {" "}
      <h1>App</h1>
      <AskQuestion />
      <Routes>
        <Route path="/question" element={<AskQuestion />} />
        <Route path="" element={<Test />} />
        <Route path="" element={<Test />} />
        <Route path="" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
