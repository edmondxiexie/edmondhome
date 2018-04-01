import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";

import jwtDecode from "jwt-decode";
import * as authUtil from "./utils/authUtil";
import { setCurrentUser } from "./actions/authActions";

import routes from "./routes/routes";
import store from "./store/store";

// console.log("token: ", localStorage.jwtToken);
if (localStorage.jwtToken) {
  authUtil.setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("root")
);
