// contain all the PageComponentContainer
import React from "react";
import { Route, IndexRoute } from "react-router";
import Root from "../components/Root";
import HomePageContainer from "../components/homepage/HomePageContainer";
import SignUpContainer from "../components/signup/SignUpContainer";
import LoginContainer from "../components/login/LoginContainer";
import IndexHomePageContainer from "../components/homes/index/IndexHomePageContainer";
import NewHomePageContainer from "../components/homes/new/NewHomePageContainer";

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={HomePageContainer} />
    <Route path="/signup" component={SignUpContainer} />
    <Route path="/login" component={LoginContainer} />
    <Route path="/homes" component={IndexHomePageContainer} />
    <Route path="/homes/new" component={NewHomePageContainer} />
  </Route>
);
