import { createStore, applyMiddleware } from "redux";
import rootReducer from "../redux/reducers/index";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
export default store;
