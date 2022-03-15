import { ITodo } from "../types/data";
import React from "react";
interface ITodoItem extends ITodo {
  removeTodo: (id: string) => void;
  toggleTodo: (id: string, completed: boolean) => void;
  editTodo: (id: string, edit: string) => void;
  refreshTodo: (id: string, value: string) => void;
  edit: string;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
  const {
    _id,
    description,
    completed,
    removeTodo,
    toggleTodo,
    editTodo,
    edit,
    refreshTodo,
  } = props;
  const [value, setValue] = React.useState(description);
  console.log(_id);
  console.log(edit);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      refreshTodo(_id, value);
    }
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
          <button onClick={() => refreshTodo(_id, value)}>save</button>
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleTodo(_id, completed)}
          />
          {description}
          <button onClick={() => removeTodo(_id)}>x</button>
          <button onClick={() => editTodo(_id, edit)}>edit</button>
        </div>
      )}
    </div>
  );
};

export { TodoItem };
