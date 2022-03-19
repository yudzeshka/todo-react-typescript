import { Route, Routes } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import { Main } from "../Pages/Main";
import Home from "../Pages/Home";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
};

export { App };
