import { Route, Routes } from "react-router-dom";
import Test from "./Pages/Test";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
      <h1>App</h1>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="" element={<Test />} />
        <Route path="" element={<Test />} />
        <Route path="" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
