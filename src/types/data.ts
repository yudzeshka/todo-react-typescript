import {
  GET_TODOS_REQUESTED,
  GET_TODOS_SUCCESS,
  GET_USER_TOKEN,
  USER_LOGIN,
  USER_SIGN_UP,
} from "../redux/types";
import rootReducer from "../redux/reducers";

export interface ITodo {
  _id: string;
  description: string;
  completed: boolean;
}

export interface ITodoItem extends ITodo {
  setTodos: () => void;
}

export interface ITodoListProps {
  items?: ITodo[];
  setTodos: () => void;
}

export interface IRequestOptions {
  method: string;
  headers: HeadersInit | undefined;
  body?: string;
  redirect: RequestRedirect | undefined;
}

export interface IBaseInput {
  setTodos: () => void;
}

export interface IBaseButton {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: "button" | "submit";
  disabled?: boolean;
}

export interface ILogInFormValues {
  email: string;
  password: string;
}

export interface ISignUpFormValues extends ILogInFormValues {
  name: string;
}

export type getTodoRequestedActionType = { type: typeof GET_TODOS_REQUESTED };

export type getTodosSuccessActionType = {
  type: typeof GET_TODOS_SUCCESS;
  todos: Array<ITodo>;
};

export type getUserTokenType = {
  type: typeof GET_USER_TOKEN;
  user: null | userType;
};

export type userInsideUserType = {
  age: number;
  createdAt: string;
  email: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type userType = { token: string; user: null | userInsideUserType };

export type userSignUpType = {
  type: typeof USER_SIGN_UP;
  raw: string;
};

export type userLoginActionType = {
  type: typeof USER_LOGIN;
  raw: string;
};

export type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;
