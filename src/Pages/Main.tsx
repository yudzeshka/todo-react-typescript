import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { TodoList } from "../components/TodoList";
import { IRequestOptions, ITodo } from "../types/data";
import { Input } from "../components/Input";
import { useTodos } from "../services/useTodos";

const Main: React.FC = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [edit, setEdit] = useState("");

  const { token } = useParams<{ token: string }>();
  console.log(token);

  const todos = useTodos(token);

  // const setTodos = async () => {
  //   const getTasks = new Headers();
  //   getTasks.append("Authorization", `Bearer ${token}`);
  //   getTasks.append("Content-Type", "application/json");

  //   const requestOptions: IRequestOptions = {
  //     method: "GET",
  //     headers: getTasks,
  //     redirect: "follow",
  //   };

  //   fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) =>
  //       result ? setTasks(JSON.parse(result).data) : setTasks([])
  //     )
  //     .catch((error) => console.log("error", error));
  // };
  console.log(useTodos(token));
  useEffect(() => {
    if (token) {
      setTasks(todos);
    }
  }, [token, todos]);

  const removeTodo = async (id: string) => {
    const removeTodoHeader = new Headers();
    removeTodoHeader.append("Authorization", `Bearer ${token}`);
    removeTodoHeader.append("Content-Type", "application/json");

    const requestOptions: IRequestOptions = {
      method: "DELETE",
      headers: removeTodoHeader,
      redirect: "follow",
    };

    await fetch(
      `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    await setTasks(todos);
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    const toggleTodoHeader = new Headers();
    toggleTodoHeader.append("Authorization", `Bearer ${token}`);
    toggleTodoHeader.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      completed: !completed,
    });

    const requestOptions: IRequestOptions = {
      method: "PUT",
      headers: toggleTodoHeader,
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
    await setTasks(todos);
  };

  const editTodo = (id: string, edit: string) => {
    setEdit(id);
  };

  const refreshTodo = async (id: string, value: string) => {
    const refreshTodoHeader = new Headers();
    refreshTodoHeader.append("Authorization", `Bearer ${token}`);
    refreshTodoHeader.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      description: value,
    });

    const requestOptions: IRequestOptions = {
      method: "PUT",
      headers: refreshTodoHeader,
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
    await setTasks(todos);
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

  return !token ? (
    <Navigate to="/" />
  ) : (
    <div>
      <Link to={"/"}>
        <button>log out</button>
      </Link>
      <div>{/* <Input token={token} setTodos={setTodos} /> */}</div>
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
