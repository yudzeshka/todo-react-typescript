import { Route, Routes } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/LogIn";
import { Link } from "react-router-dom";
import { Main } from "../Pages/Main";
const App: React.FC = () => {
  return (
    <div>
      <div className="wrapper">
        <div>
          <Link to={"/login"}>
            <button>login</button>
          </Link>
          <Link to={"/sign-up"}>
            <button>sign up</button>
          </Link>
        </div>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:token" element={<Main />} />
        </Routes>
      </div>
    </div>
  );
};

export { App };
