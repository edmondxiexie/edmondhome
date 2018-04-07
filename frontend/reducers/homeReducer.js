import * as homeUtil from "../utils/homeUtil";
import { isEmpty, merge, assign } from "lodash";

const defaultHome = Object.freeze({
  homesCount: null,
  page: 1,
  homes: null,
  home: null,
  error: []
});

const HomeReducer = (state = defaultHome, action) => {
  Object.freeze(state);
  let homes, home, homesCount, page;
  switch (action.type) {
    case homeUtil.GET_HOMES:
      console.log("******/homes REDUCER GET******");
      homes = action.homes;
      const newHomesState = Object.assign({}, state, { homes: homes });
      return newHomesState;
    case homeUtil.GET_HOME:
      console.log("******/home REDUCER GET******");
      home = action.home;
      const newHomeState = Object.assign({}, state, { home: home });
      return newHomeState;
    case homeUtil.PUT_HOME:
      console.log("******/home REDUCER PUT******");
      home = action.home;
      const newPutHomeState = Object.assign({}, state, { home: home });
      return newPutHomeState;
    case homeUtil.GET_HOMES_COUNT:
      console.log("******/home REDUCER GET******");
      homesCount = action.homesCount;
      const newHomesCountState = Object.assign({}, state, {
        homesCount: homesCount
      });
      return newHomesCountState;
    case homeUtil.GET_HOMES_PAGE:
      console.log("******/home REDUCER GET******");
      homes = action.homes;
      const newHomesPageState = Object.assign({}, state, { homes: homes });
      return newHomesPageState;
    case homeUtil.SET_HOMES_CURRENT_PAGE:
      page = action.page;
      const newPageState = Object.assign({}, state, { page: page });
      return newPageState;
    default:
      return state;
  }
};

export default HomeReducer;
