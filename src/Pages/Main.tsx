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

  const todos = useSelector((state: any) => state.todos.todos);
  console.log(todos);
  const loading = useSelector((state: any) => state.todos.loading);

  const dispatch = useDispatch();
  console.log(loading);

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
    if (todos) {
      setTasks(todos);
    }
  }, []);

  return !token ? (
    <Navigate to="/" />
  ) : loading ? (
    <p>loading.....</p>
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
