import { ITodo } from "../../types/data";
import React from "react";
import { removeTodo, toggleTodo, refreshTodo } from "../../services/services";
import Button from "../Button";
import styles from "./TodoItem.module.scss";

interface ITodoItem extends ITodo {
  setTodos: () => void;
  token: string;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const { setTodos, _id, description, completed, token } = props;

  const [value, setValue] = React.useState(description);
  const [edit, setEdit] = React.useState("");

  const onClickEdit = (id: any) => {
    setEdit(id);
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
      setEdit("");
    }
  };

  const onClickSave: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await refreshTodo(_id, value, token);
    setTodos();
    setEdit("");
  };

  return (
    <div className={styles.todoItem}>
      {edit === _id ? (
        <>
          <input
            className={styles.editValue}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={(e) => setValue(e.target.value)}
          />{" "}
          <Button text={"Save"} onClick={onClickSave} type={"button"} />
        </>
      ) : (
        <>
          <input type="checkbox" checked={completed} onChange={onClickToggle} />
          <span>{description}</span>
          <div className="buttonsBlock">
            <Button text={"delete"} onClick={onClickRemove} type={"button"} />
            <Button
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
