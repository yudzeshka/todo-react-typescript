import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { TodoList } from "../components/TodoList";
import { IRequestOptions, ITodo } from "../types/data";
import { Navigate } from "react-router-dom";

const Main: React.FC = () => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState<ITodo[]>([]);
  const [edit, setEdit] = useState("");

  const { token } = useParams<{ token: string }>();
  console.log(token);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const setTodos = async () => {
    var getTasks = new Headers();
    getTasks.append("Authorization", `Bearer ${token}`);
    getTasks.append("Content-Type", "application/json");

    var requestOptions: IRequestOptions = {
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
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (token) {
      setTodos();
    }
  }, [token]);

  const addTodo = async () => {
    if (value) {
      var addTask = new Headers();
      addTask.append("Authorization", `Bearer ${token}`);
      addTask.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        description: value,
      });

      var requestOptions: IRequestOptions = {
        method: "POST",
        headers: addTask,
        body: raw,
        redirect: "follow",
      };
      setValue("");

      await fetch(
        "https://api-nodejs-todolist.herokuapp.com/task",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      token && (await setTodos());
    }
  };

  const removeTodo = async (id: string) => {
    var removeTask = new Headers();
    removeTask.append("Authorization", `Bearer ${token}`);
    removeTask.append("Content-Type", "application/json");

    var requestOptions: IRequestOptions = {
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
    var toggleTask = new Headers();
    toggleTask.append("Authorization", `Bearer ${token}`);
    toggleTask.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      completed: !completed,
    });

    var requestOptions: IRequestOptions = {
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
    var editTask = new Headers();
    editTask.append("Authorization", `Bearer ${token}`);
    editTask.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      description: value,
    });

    var requestOptions: IRequestOptions = {
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
      <div className="wrapper"></div>

      <div>
        <input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTodo}>Add</button>
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
