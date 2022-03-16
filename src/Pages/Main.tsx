import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { TodoList } from "../components/TodoList";
import { IRequestOptions, ITodo } from "../types/data";
import { Input } from "../components/Input";
import { logOut } from "../services/services";

const Main: React.FC = () => {
  const [tasks, setTasks] = useState<ITodo[]>([]);

  const { token } = useParams<{ token: string }>();

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
    if (token) {
      setTodos();
    }
  }, [token]);

  return !token ? (
    <Navigate to="/" />
  ) : (
    <div>
      <Link to={"/"}>
        <button onClick={() => logOut(token)}>log out</button>
      </Link>
      <div>
        <Input token={token} setTodos={setTodos} />
      </div>
      <TodoList items={tasks} setTodos={setTodos} token={token} />
    </div>
  );
};

export { Main };
