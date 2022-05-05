import { ITodoListProps, ITodo } from "../../types/data";
import { TodoItem } from "./TodoItem/TodoItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";

const TodoList: React.FC<ITodoListProps> = (props) => {
  const { setTodos } = props;
  const todos: ITodo[] = useSelector((state: any) => state.todos.todos);
  return (
    <TransitionGroup component="div">
      {todos.map((todo) => (
        <CSSTransition key={todo._id} classNames={"todo"} timeout={800}>
          <TodoItem key={todo._id} {...todo} setTodos={setTodos} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export { TodoList };
