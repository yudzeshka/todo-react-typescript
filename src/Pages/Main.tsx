import { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { TodoList } from "../components/Main/TodoList";
import { BaseInput } from "../components/Main/BaseInput/BaseInput";
import { logOut } from "../services/userApi";
import BaseButton from "../components/common/BaseButton/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import { GET_TODOS_REQUESTED } from "../redux/types";
import DotLoader from "react-spinners/DotLoader";
import { override } from "../components/Main/Spinner";
import { AppStateType } from "../types/data";
const Main: React.FC = () => {
  const loading = useSelector((state: AppStateType) => state.todos.loading);
  const user = useSelector((state: AppStateType) => state.user);
  const dispatch = useDispatch();

  // const { userName } = useParams<{ userName: any }>();
  const token: string | null = localStorage.getItem("token");
  const setTodos = () => {
    dispatch({ type: GET_TODOS_REQUESTED });
  };

  useEffect(() => {
    setTodos();
  }, [user]);

  return !token ? (
    <Navigate to="/" />
  ) : loading ? (
    <DotLoader color="blue" loading={loading} css={override} size={100} />
  ) : (
    <div className="mainPage">
      <Link to={"/"}>
        <BaseButton
          text={"log out"}
          type={"button"}
          onClick={() => logOut(token)}
        />
      </Link>
      <div>
        <BaseInput setTodos={setTodos} />
      </div>
      <TodoList setTodos={setTodos} />
    </div>
  );
};

export default Main;
