import { useState, useEffect, useRef } from "react";
import { TodoList } from "./TodoList";
import { ITodo } from "../types/data";
import { Route, Routes } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/LogIn";
import { Link } from "react-router-dom";
const App: React.FC = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);

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
  });

  return (
    <div>
      <div className="wrapper">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<App />} />
        </Routes>
      </div>
      <div>
        <Link to={"/login"}>
          <button>login</button>
        </Link>
        <Link to={"/sign-up"}>
          <button>sign up</button>
        </Link>
      </div>
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
    </div>
  );
};

export { App };
