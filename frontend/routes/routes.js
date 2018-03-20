// contain all the PageComponentContainer
import React from "react";
import { Route, IndexRoute } from "react-router";
import Root from "../components/Root";
import HomePageContainer from "../components/homepage/HomePageContainer";
import SignUpContainer from "../components/signup/SignUpContainer";
import LoginContainer from "../components/login/LoginContainer";

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={HomePageContainer} />
    <Route path="signup" component={SignUpContainer} />
    <Route path="login" component={LoginContainer} />
  </Route>
);
