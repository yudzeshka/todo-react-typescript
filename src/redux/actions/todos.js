import { TodoList } from "../../components/Main/TodoList";
import * as type from "../types";

export function getTodos(todos) {
  return {
    type: type.GET_TODOS_REQUESTED,
    payload: todos,
  };
}
