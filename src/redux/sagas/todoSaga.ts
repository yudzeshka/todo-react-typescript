import { call, put, takeEvery } from "redux-saga/effects";
import {
  getTodoRequestedActionType,
  IRequestOptions,
  ITodo,
} from "../../types/data";
import { GET_TODOS_SUCCESS, GET_TODOS_REQUESTED } from "../types";

function* fetchTodos(action: getTodoRequestedActionType) {
  const token = localStorage.getItem("token");

  const getApi = async (): Promise<Array<ITodo>> => {
    const getTodosHeader = new Headers();
    getTodosHeader.append("Authorization", `Bearer ${token}`);
    getTodosHeader.append("Content-Type", "application/json");

    const requestOptions: IRequestOptions = {
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

  const todos: Array<ITodo> = yield call(getApi);
  yield put({
    type: GET_TODOS_SUCCESS,
    todos: todos,
  });
}

function* todoSaga() {
  yield takeEvery(GET_TODOS_REQUESTED, fetchTodos);
}

export default todoSaga;
