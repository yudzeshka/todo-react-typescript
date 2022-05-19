import { ITodo } from "../../types/data";
import { GetTodosType } from "../actions/todos";
import { GET_TODOS_REQUESTED, GET_TODOS_SUCCESS } from "../types";
import {
  getTodoRequestedActionType,
  getTodosSuccessActionType,
} from "../../types/data";

export type InitialStateType = typeof initialState;

const initialState = {
  todos: [] as Array<ITodo>,
  loading: false,
};

type ActionTypes = getTodoRequestedActionType | getTodosSuccessActionType;
export default function todos(
  state = initialState,
  action: ActionTypes
): InitialStateType {
  switch (action.type) {
    case GET_TODOS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.todos,
        loading: false,
      };

    default:
      return state;
  }
}
