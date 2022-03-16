import React from "react";
import { useState, useEffect, useRef } from "react";
import { IRequestOptions } from "../types/data";
interface IInput {
  token: string;
  setTodos: () => void;
}

const Input: React.FC<IInput> = (props) => {
  const { token, setTodos } = props;
  const [value, setValue] = useState("");
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const addTodo = async () => {
    if (value) {
      const addTodoHeader = new Headers();
      addTodoHeader.append("Authorization", `Bearer ${token}`);
      addTodoHeader.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        description: value,
      });

      const requestOptions: IRequestOptions = {
        method: "POST",
        headers: addTodoHeader,
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

  return (
    <div>
      <input
        value={value}
        onChange={handleChange}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
};

export { Input };
