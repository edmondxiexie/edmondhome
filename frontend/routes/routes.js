// contain all the PageComponentContainer
import React from "react";
import { Route, IndexRoute } from "react-router";
import Root from "../components/Root";
import HomePageContainer from "../components/homepage/HomePageContainer";
import SignUpContainer from "../components/signup/SignUpContainer";
import LoginContainer from "../components/login/LoginContainer";
import IndexHomePageContainer from "../components/homes/index/IndexHomePageContainer";
import NewHomePageContainer from "../components/homes/new/NewHomePageContainer";
import DetailHomePageContainer from "../components/homes/detail/DetailHomePageContainer";
import EditHomePageContainer from "../components/homes/edit/EditHomePageContainer";
import ProfileContainer from "../components/profile/ProfileContainer";
import ManageHostsPageContainer from "../components/manage/ManageHostsPageContainer";
import IndexTripsPageContainer from "../components/trips/index/IndexTripsPageContainer";
import IndexWishlistPageContainer from "../components/wishlist/index/IndexWishlistPageContainer";

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={HomePageContainer} />
    <Route path="/signup" component={SignUpContainer} />
    <Route path="/login" component={LoginContainer} />
    <Route path="/homes" component={IndexHomePageContainer} />
    <Route path="/homes/new" component={NewHomePageContainer} />
    <Route path="/homes/:id" component={DetailHomePageContainer} />
    <Route path="/homes/:id/edit" component={EditHomePageContainer} />
    <Route path="/profile" component={ProfileContainer} />
    <Route path="/manage" component={ManageHostsPageContainer} />
    <Route path="/trips" component={IndexTripsPageContainer} />
    <Route path="/wishlist" component={IndexWishlistPageContainer} />
  </Route>
);
