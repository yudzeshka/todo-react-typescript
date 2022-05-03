import { GET_TODOS_SUCCESS } from "../types";

const initialState = {
  todos: [],
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.todos,
      };
    default:
      return state;
  }
}

// const initialState = {
//   users: [],
//   loading: false,
//   error: null,
// }

// export default function users(state = initialState, action) {
//   switch (action.type) {
//     case type.GET_USERS_REQUESTED:
//       return {
//         ...state,
//         loading: true,
//       }
//     case type.GET_USERS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         users: action.users
//       }
//     case type.GET_USERS_FAILED:
//       return {
//         ...state,
//         loading: false,
//         error: action.message,
//       }
//     default:
//       return state
//   }
// }
