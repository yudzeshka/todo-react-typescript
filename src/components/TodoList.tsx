import { ITodo } from "../types/data";
import { TodoItem } from "../components/TodoItem";

interface ITodoListProps {
  items: ITodo[];
  toggleTodo: (id: string, completed: boolean) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, edit: string) => void;
  refreshTodo: (id: string, value: string) => void;
  edit: string;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
  const { items, toggleTodo, removeTodo, editTodo, edit, refreshTodo } = props;
  return (
    <div>
      {props.items.map((todo) => (
        <TodoItem
          key={todo._id}
          {...todo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
          edit={edit}
          refreshTodo={refreshTodo}
        />
      ))}
    </div>
  );
};

export { TodoList };
