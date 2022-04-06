import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "../src/components/App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,

  document.getElementById("root")
);
