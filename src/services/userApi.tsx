import { IRequestOptions } from "../types/data";

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

export { logOut };
