export interface ITodo {
  _id: string;
  description: string;
  completed: boolean;
}

export interface ITodoItem extends ITodo {
  setTodos: () => void;
  token: string;
}

export interface ITodoListProps {
  items: ITodo[];
  setTodos: () => void;
  token: string;
}

export interface IRequestOptions {
  method: string;
  headers: HeadersInit | undefined;
  body?: string;
  redirect: RequestRedirect | undefined;
}

export interface IBaseInput {
  token: string;
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
