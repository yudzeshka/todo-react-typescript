import { ITodo } from "../types/data";
import React from "react";
import { removeTodo, toggleTodo, refreshTodo } from "../services/services";

interface ITodoItem extends ITodo {
  setTodos: () => void;
  token: string;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const { setTodos, _id, description, completed, token } = props;

  const [value, setValue] = React.useState(description);
  const [edit, setEdit] = React.useState("");

  const onClickEdit = (id: string) => {
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
    }
  };

  const onClickSave: React.MouseEventHandler<HTMLButtonElement> = async () => {
    await refreshTodo(_id, value, token);
    setTodos();
    setEdit("");
  };

  return (
    <div>
      {edit === _id ? (
        <div>
          <input
            value={value}
            onKeyDown={handleKeyDown}
            onChange={(e) => setValue(e.target.value)}
          />{" "}
          <button onClick={onClickSave}>save</button>
        </div>
      ) : (
        <div>
          <input type="checkbox" checked={completed} onChange={onClickToggle} />
          {description}
          <button onClick={onClickRemove}>x</button>
          <button onClick={() => onClickEdit(_id)}>edit</button>
        </div>
      )}
    </div>
  );
};

export { TodoItem };
