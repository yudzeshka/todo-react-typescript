import { ITodoListProps } from "../../types/data";
import { TodoItem } from "./TodoItem/TodoItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const TodoList: React.FC<ITodoListProps> = (props) => {
  const { setTodos } = props;
  return (
    <TransitionGroup component="div">
      {props.items.map((todo) => (
        <CSSTransition key={todo._id} classNames={"todo"} timeout={800}>
          <TodoItem key={todo._id} {...todo} setTodos={setTodos} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export { TodoList };
