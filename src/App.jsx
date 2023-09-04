import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/login";
import Main from "./pages/main/main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
