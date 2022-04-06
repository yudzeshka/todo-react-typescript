import { call, put, takeEvery } from "redux-saga/effects";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMxZTI4OTIzMzEzNjAwMTc5MmUzZGMiLCJpYXQiOjE2NDkyNDczMjZ9.FGHiPtVvP_7kJbwYGBFY7g0lU9PxiJipQ3FaI7zV070";

const getApi = async () => {
  const getTodosHeader = new Headers();
  getTodosHeader.append("Authorization", `Bearer ${token}`);
  getTodosHeader.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: getTodosHeader,
    redirect: "follow",
  };

  fetch("https://api-nodejs-todolist.herokuapp.com/task", requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result).data)
    .catch((error) => console.log("error", error));
};

function* fetchTodos(action) {
  const todos = yield call(getApi);
  yield put({ type: "GET_TODOS_SUCCESS", todos: todos });
}

function* todoSaga() {
  yield takeEvery("GET_TODOS_REQUESTED", fetchTodos);
}

export default todoSaga;
