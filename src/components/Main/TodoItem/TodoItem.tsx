import { ITodoItem } from "../../../types/data";
import React from "react";
import { removeTodo, toggleTodo, refreshTodo } from "../../../services/todoApi";
import BaseButton from "../../common/BaseButton/BaseButton";

import styles from "./TodoItem.module.scss";
import { useState, useEffect, useRef } from "react";

const TodoItem: React.FC<ITodoItem> = (props) => {
  const { setTodos, _id, description, completed, token } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const [value, setValue] = useState(description);
  const [editedTodoId, setEditedTodoId] = useState("");

  const onClickEdit = (id: any) => {
    setEditedTodoId(id);
  };

  const onClickRemove: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    await removeTodo(_id, token);
    setTodos();
  };

  const onClickToggle: React.ChangeEventHandler<
    HTMLInputElement
  > = async () => {
    await toggleTodo(_id, completed, token);
    setTodos();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.key === "Enter") {
      await refreshTodo(_id, value, token);
      setTodos();
      setEditedTodoId("");
    }
  };

  const onClickSave: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await refreshTodo(_id, value, token);
    setTodos();
    setEditedTodoId("");
  };

  return (
    <div className={styles.todoItem}>
      {editedTodoId === _id ? (
        <>
          <input
            className={styles.editValue}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={(e) => setValue(e.target.value)}
            ref={inputRef}
          />{" "}
          <BaseButton text={"Save"} onClick={onClickSave} type={"button"} />
        </>
      ) : (
        <>
          <input type="checkbox" checked={completed} onChange={onClickToggle} />
          <span>{description}</span>
          <div className="buttonsBlock">
            <BaseButton
              text={"delete"}
              onClick={onClickRemove}
              type={"button"}
            />
            <BaseButton
              text={"edit"}
              onClick={() => onClickEdit(_id)}
              type={"button"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export { TodoItem };
