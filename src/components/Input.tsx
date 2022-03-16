import React from "react";
import { useState, useEffect, useRef } from "react";
import { addTodo } from "../services/services";

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
      onClickAdd();
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const onClickAdd = async () => {
    await addTodo(value, token);
    setTodos();
    setValue("");
  };

  return (
    <div>
      <input
        value={value}
        onChange={handleChange}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onClickAdd}>Add</button>
    </div>
  );
};

export { Input };
