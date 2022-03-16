import { IRequestOptions } from "../types/data";

const addTodo = async (value: string, token: string) => {
  if (value) {
    const addTodoHeader = new Headers();
    addTodoHeader.append("Authorization", `Bearer ${token}`);
    addTodoHeader.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      description: value,
    });

    const requestOptions: IRequestOptions = {
      method: "POST",
      headers: addTodoHeader,
      body: raw,
      redirect: "follow",
    };
    await fetch(
      "https://api-nodejs-todolist.herokuapp.com/task",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
};

const removeTodo = async (id: string, token: string) => {
  const removeTodoHeader = new Headers();
  removeTodoHeader.append("Authorization", `Bearer ${token}`);
  removeTodoHeader.append("Content-Type", "application/json");

  const requestOptions: IRequestOptions = {
    method: "DELETE",
    headers: removeTodoHeader,
    redirect: "follow",
  };

  await fetch(
    `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const toggleTodo = async (id: string, completed: boolean, token: string) => {
  const toggleTodoHeader = new Headers();
  toggleTodoHeader.append("Authorization", `Bearer ${token}`);
  toggleTodoHeader.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    completed: !completed,
  });

  const requestOptions: IRequestOptions = {
    method: "PUT",
    headers: toggleTodoHeader,
    body: raw,
    redirect: "follow",
  };

  await fetch(
    `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const refreshTodo = async (id: string, value: string, token: string) => {
  const refreshTodoHeader = new Headers();
  refreshTodoHeader.append("Authorization", `Bearer ${token}`);
  refreshTodoHeader.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    description: value,
  });

  const requestOptions: IRequestOptions = {
    method: "PUT",
    headers: refreshTodoHeader,
    body: raw,
    redirect: "follow",
  };

  await fetch(
    `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const logOut = async (token: string) => {
  const logOutHeader = new Headers();
  logOutHeader.append("Authorization", `Bearer ${token}`);

  const requestOptions: IRequestOptions = {
    method: "POST",
    headers: logOutHeader,
    redirect: "follow",
  };

  await fetch(
    "https://api-nodejs-todolist.herokuapp.com/user/logout",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export { refreshTodo, toggleTodo, removeTodo, addTodo, logOut };
