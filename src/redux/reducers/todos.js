import * as type from "../types";

const initialState = {
  todos: [],
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case type.GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
}
