import { getUserTokenType, ITodo, userType } from "../../types/data";
import { GetTodosType } from "../actions/todos";
import { GET_USER_TOKEN } from "../types";
import { userInsideUserType } from "../../types/data";

export type InitialStateType = {
  user: null | userType;
};

const initialState = {
  user: null,
};

export default function user(
  state = initialState,
  action: getUserTokenType
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
