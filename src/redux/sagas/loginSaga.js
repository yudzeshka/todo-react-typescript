import { call, put, takeEvery } from "redux-saga/effects";
import { GET_USER_TOKEN, USER_LOGIN } from "../types";

function* putUser(action) {
  const raw = action.raw;
  const fetchUser = async () => {
    const logInHeader = new Headers();
    logInHeader.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: logInHeader,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/login",
      requestOptions
    );
    const result = await response.json();
    localStorage.setItem("token", result.token);

    return result;
  };

  const user = yield call(fetchUser);
  yield put({
    type: GET_USER_TOKEN,
    user: user,
  });
}

function* loginSaga() {
  yield takeEvery(USER_LOGIN, putUser);
}

export default loginSaga;
