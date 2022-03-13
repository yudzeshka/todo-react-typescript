export interface ITodo {
  _id: string;
  description: string;
  completed: boolean;
}

export interface IRequestOptions {
  method: string;
  headers: HeadersInit | undefined;
  body?: string;
  redirect: RequestRedirect | undefined;
}
