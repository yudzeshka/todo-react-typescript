import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { TodoList } from "../components/TodoList";
import { IRequestOptions, ITodo } from "../types/data";
import { Input } from "../components/Input";

const Main: React.FC = () => {
  const [tasks, setTasks] = useState<ITodo[]>([]);
  const [edit, setEdit] = useState("");

  const { token } = useParams<{ token: string }>();
  console.log(token);

  const setTodos = async () => {
    const getTasks = new Headers();
    getTasks.append("Authorization", `Bearer ${token}`);
    getTasks.append("Content-Type", "application/json");

    const requestOptions: IRequestOptions = {
      method: "GET",
      headers: getTasks,
      redirect: "follow",
    };

    fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
      .then((response) => response.text())
      .then((result) =>
        result ? setTasks(JSON.parse(result).data) : setTasks([])
      )
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (token) {
      setTodos();
    }
  }, [token]);

  const removeTodo = async (id: string) => {
    const removeTask = new Headers();
    removeTask.append("Authorization", `Bearer ${token}`);
    removeTask.append("Content-Type", "application/json");

    const requestOptions: IRequestOptions = {
      method: "DELETE",
      headers: removeTask,
      redirect: "follow",
    };

    await fetch(
      `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    await setTodos();
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    const toggleTask = new Headers();
    toggleTask.append("Authorization", `Bearer ${token}`);
    toggleTask.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      completed: !completed,
    });

    const requestOptions: IRequestOptions = {
      method: "PUT",
      headers: toggleTask,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    await setTodos();
  };

  const editTodo = (id: string, edit: string) => {
    setEdit(id);
  };

  const refreshTodo = async (id: string, value: string) => {
    const editTask = new Headers();
    editTask.append("Authorization", `Bearer ${token}`);
    editTask.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      description: value,
    });

    const requestOptions: IRequestOptions = {
      method: "PUT",
      headers: editTask,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    await setTodos();
    setEdit("");
  };
  // const removeTodo = (id: number): void => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  // const toggleTodo = (id: number): void => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id !== id) return todo;
  //       return { ...todo, complete: !todo.complete };
  //     })
  //   );
  // };

  tasks && console.log(tasks.map((task: any) => task.description));
  return !token ? (
    <Navigate to="/" />
  ) : (
    <div>
      <Link to={"/"}>
        <button>log out</button>
      </Link>
      <div>
        <Input token={token} setTodos={setTodos} />
      </div>
      <TodoList
        items={tasks}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
        edit={edit}
        refreshTodo={refreshTodo}
      />
    </div>
  );
};

export { Main };
