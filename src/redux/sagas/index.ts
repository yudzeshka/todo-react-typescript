import { all } from "redux-saga/effects";
import todoSaga from "./todoSaga";
import loginSaga from "./loginSaga";
import signUpSaga from "./SignUpSaga";

export default function* rootSaga() {
  yield all([loginSaga(), signUpSaga(), todoSaga()]);
}
