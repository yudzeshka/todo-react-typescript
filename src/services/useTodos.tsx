import React from "react";
import { IRequestOptions } from "../types/data";

const useTodos = async (token: any) => {
  const [todos, setTodos] = React.useState([]);
  React.useEffect(() => {
    const getTasks = new Headers();
    getTasks.append("Authorization", `Bearer ${token}`);
    getTasks.append("Content-Type", "application/json");

    const requestOptions: IRequestOptions = {
      method: "GET",
      headers: getTasks,
      redirect: "follow",
    };

    fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
      .then((response) => response.text())
      .then((result) => setTodos(JSON.parse(result).data))
      .catch((error) => console.log("error", error));
  }, []);
  console.log(todos);
  return todos;
};

export { useTodos };
