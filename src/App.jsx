import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/login";
import Main from "./pages/main/main";
import UsersPage from "./pages/users/users";
import UsersInfo from "./pages/userInfo/userInfo";
import EditUser from "./pages/editUser/editUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UsersInfo />} />
        <Route path="/users/edit/:id" element={<EditUser />} />

        {/* <Route path="/*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
