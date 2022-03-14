import { Route, Routes } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/LogIn";
import { Link } from "react-router-dom";
import { Main } from "../Pages/Main";
import Home from "../Pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:token" element={<Main />} />
      </Routes>
    </div>
  );
};

export { App };
