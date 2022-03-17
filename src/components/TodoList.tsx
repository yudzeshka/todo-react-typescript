import { ITodo } from "../types/data";
import { TodoItem } from "./TodoItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

interface ITodoListProps {
  items: ITodo[];
  setTodos: () => void;
  token: string;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
  const { setTodos, token } = props;
  return (
    <TransitionGroup>
      {props.items.map((todo) => (
        <CSSTransition key={todo._id} classNames={"todo"} timeout={800}>
          <TodoItem
            key={todo._id}
            {...todo}
            setTodos={setTodos}
            token={token}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export { TodoList };
