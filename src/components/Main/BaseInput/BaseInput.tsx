import React from "react";
import { useState, useEffect, useRef } from "react";
import { addTodo } from "../../../services/todoApi";
import BaseButton from "../../common/BaseButton/BaseButton";
import styles from "./BaseInput.module.scss";
import { IBaseInput } from "../../../types/data";

const BaseInput: React.FC<IBaseInput> = (props) => {
  const { setTodos } = props;

  const [value, setValue] = useState("");

  const token: string | null = localStorage.getItem("token");

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
    <div className={styles.inputBlock}>
      <input
        value={value}
        onChange={handleChange}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
      <BaseButton text={"Add Todo"} onClick={onClickAdd} type={"button"} />
    </div>
  );
};

export { BaseInput };
