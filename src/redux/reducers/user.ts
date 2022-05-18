import { ITodo } from "../../types/data";
import { GetTodosType } from "../actions/todos";
import { GET_USER_TOKEN } from "../types";

export type InitialStateType = typeof initialState;

const initialState = {
  user: null,
};

export default function user(
  state = initialState,
  action: any
): InitialStateType {
  switch (action.type) {
    case GET_USER_TOKEN:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
}
