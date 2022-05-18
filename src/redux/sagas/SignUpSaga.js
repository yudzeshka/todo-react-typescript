import { call, put, takeEvery } from "redux-saga/effects";
import { GET_USER_TOKEN, USER_SIGN_UP } from "../types";

function* registerUser(action) {
  const raw = action.raw;
  const fetchUser = async () => {
    const signUpHeader = new Headers();
    signUpHeader.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: signUpHeader,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/register",
      requestOptions
    );
    const result = await response.json();

    console.log(result.token);
    return result;
  };

  const user = yield call(fetchUser);
  yield console.log(user);
  yield put({
    type: GET_USER_TOKEN,
    user: user,
  });
}

function* signUpSaga() {
  yield takeEvery(USER_SIGN_UP, registerUser);
}

export default signUpSaga;
