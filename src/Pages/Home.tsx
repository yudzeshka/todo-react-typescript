import { Link } from "react-router-dom";
import BaseButton from "../components/common/BaseButton/BaseButton";

export default function Home() {
  return (
    <div className="homePage">
      <h1>TODO LIST</h1>
      <div>
        <Link to={"/login"}>
          <BaseButton text={"Login"} type={"button"} />
        </Link>
        <Link to={"/sign-up"}>
          <BaseButton text={"Sign up"} type={"button"} />
        </Link>
      </div>
    </div>
  );
}
