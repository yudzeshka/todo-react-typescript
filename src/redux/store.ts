import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas";
import { AppStateType } from "../types/data";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
export default store;
