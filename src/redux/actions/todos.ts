import { TodoList } from "../../components/Main/TodoList";
import * as type from "../types";
import { ITodo } from "../../types/data";

export type GetTodosType = {
  type: typeof type.GET_TODOS_REQUESTED;
  payload?: ITodo;
};

export function getTodos(todos?: ITodo): GetTodosType {
  return {
    type: type.GET_TODOS_REQUESTED,
    payload: todos,
  };
}
