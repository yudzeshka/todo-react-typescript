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
