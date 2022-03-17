import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="homePage">
      <h1>TODO LIST</h1>
      <div>
        <Link to={"/login"}>
          <Button text={"Login"} type={"button"} />
        </Link>
        <Link to={"/sign-up"}>
          <Button text={"Sign up"} type={"button"} />
        </Link>
      </div>
    </div>
  );
}
