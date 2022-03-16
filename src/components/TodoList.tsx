import { ITodo } from "../types/data";
import { TodoItem } from "../components/TodoItem";

interface ITodoListProps {
  items: ITodo[];
  setTodos: () => void;
  token: string;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
  const { setTodos, token } = props;
  return (
    <div>
      {props.items.map((todo) => (
        <TodoItem key={todo._id} {...todo} setTodos={setTodos} token={token} />
      ))}
    </div>
  );
};

export { TodoList };
