import { call, put, takeEvery } from "redux-saga/effects";
import { GET_TODOS_SUCCESS, GET_TODOS_REQUESTED } from "../types";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMzYjhiMDcxNjFhZDAwMTc3ZDJkNGMiLCJpYXQiOjE2NTE0MDQxNDh9.Irco7vRJd2bb8VNLgJFFAOEh9phahqIrhRzgQvlgUvo";

const getApi = async () => {
  const getTodosHeader = new Headers();
  getTodosHeader.append("Authorization", `Bearer ${token}`);
  getTodosHeader.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: getTodosHeader,
    redirect: "follow",
  };
  const response = await fetch(
    "https://api-nodejs-todolist.herokuapp.com/task",
    requestOptions
  );
  const result = await response.json();
  const data = await result.data;
  return data;
};
function* fetchTodos(action) {
  const todos = yield call(getApi);
  yield put({
    type: GET_TODOS_SUCCESS,
    todos: todos,
  });
}

function* todoSaga() {
  yield takeEvery(GET_TODOS_REQUESTED, fetchTodos);
}

export default todoSaga;
