import { useState, useEffect, useRef } from "react";
import { TodoList } from "../components/TodoList";
import { IRequestOptions, ITodo } from "../types/data";
import { Route, Routes } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/LogIn";
import { Link } from "react-router-dom";
const Main: React.FC = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [tasks, setTasks] = useState([]);
  const token: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJjODEyNWQzMDEyZjAwMTc2MDUwYmMiLCJpYXQiOjE2NDcwODM4MTN9.w9x6F4oVSfizkI3jl-iw8DOIuujhP1xjtkPQXhNWuew";
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = () => {
    if (value) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: value,
          complete: false,
        },
      ]);
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

      fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
    setValue("");
  };

  const removeTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, complete: !todo.complete };
      })
    );
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
      .then((result) => setTasks(JSON.parse(result).data))
      .catch((error) => console.log("error", error));
  }, []);
  tasks && console.log(tasks.map((task: any) => task.description));
  return (
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
      <TodoList items={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
      {tasks && tasks.map((task: any) => <p>{task.description}</p>)}
    </div>
  );
};

export { Main };
