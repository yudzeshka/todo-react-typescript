import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { TodoList } from "../components/Main/TodoList";
import { IRequestOptions, ITodo } from "../types/data";
import { BaseInput } from "../components/Main/BaseInput/BaseInput";
import { logOut } from "../services/userApi";
import BaseButton from "../components/common/BaseButton/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../redux/actions/todos";

const Main: React.FC = () => {
  const [tasks, setTasks] = useState<ITodo[]>([]);

  const dispatch = useDispatch();
  // const { userName } = useParams<{ userName: any }>();
  const token: string | null = localStorage.getItem("token");
  const setTodos = async () => {
    const getTodosHeader = new Headers();
    getTodosHeader.append("Authorization", `Bearer ${token}`);
    getTodosHeader.append("Content-Type", "application/json");

    const requestOptions: IRequestOptions = {
      method: "GET",
      headers: getTodosHeader,
      redirect: "follow",
    };

    fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
      .then((response) => response.text())
      .then((result) => setTasks(JSON.parse(result).data))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    dispatch(getTodos());
    if (token) {
      setTodos();
    }
  }, [token]);

  return !token ? (
    <Navigate to="/" />
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
      <TodoList items={tasks} setTodos={setTodos} />
    </div>
  );
};

export default Main;
