import { combineReducers } from "redux";
import todos from "./todos";
import user from "./user";

const rootReducer = combineReducers({ todos: todos, user: user });

export default rootReducer;
