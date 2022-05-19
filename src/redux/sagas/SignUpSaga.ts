import { call, put, takeEvery } from "redux-saga/effects";
import { IRequestOptions, userSignUpType } from "../../types/data";
import { GET_USER_TOKEN, USER_SIGN_UP } from "../types";

function* registerUser(action: userSignUpType) {
  const raw = action.raw;
  const fetchUser = async (): Promise<string> => {
    const signUpHeader = new Headers();
    signUpHeader.append("Content-Type", "application/json");

    const requestOptions: IRequestOptions = {
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

  const user: string = yield call(fetchUser);
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
