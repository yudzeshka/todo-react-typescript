import React from "react";
import { IRequestOptions } from "../types/data";

const useTodos = async (token: any) => {
  const [todos, setTodos] = React.useState([]);
  React.useEffect(() => {
    const getTasksHeader = new Headers();
    getTasksHeader.append("Authorization", `Bearer ${token}`);
    getTasksHeader.append("Content-Type", "application/json");

    const requestOptions: IRequestOptions = {
      method: "GET",
      headers: getTasksHeader,
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
