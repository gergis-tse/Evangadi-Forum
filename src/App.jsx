import { Route, Routes } from "react-router-dom";
import Test from "./Pages/Test";

function App() {
  return (
    <>
      <h1>App</h1>
      <Routes>
        <Route path="" element={<Test />} />
        <Route path="" element={<Test />} />
        <Route path="" element={<Test />} />
        <Route path="" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
