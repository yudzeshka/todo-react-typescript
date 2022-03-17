import React from "react";
import { useState, useEffect, useRef } from "react";
import { addTodo } from "../../services/services";
import Button from "../Button";
import styles from "./Input.module.scss";

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

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.key === "Enter") {
      await addTodo(value, token);
      setTodos();
      setValue("");
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const onClickAdd: React.MouseEventHandler<HTMLButtonElement> = async () => {
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
        className={styles.input}
      />
      <Button text={"Add"} onClick={onClickAdd} type={"button"} />
    </div>
  );
};

export { Input };
