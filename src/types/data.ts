export interface ITodo {
  id: number;
  title: string;
  complete: boolean;
}

export interface IRequestOptions {
  method: string;
  headers: HeadersInit | undefined;
  body?: string;
  redirect: RequestRedirect | undefined;
}
