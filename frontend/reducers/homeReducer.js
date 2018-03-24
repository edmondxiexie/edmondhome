import * as homeUtil from "../utils/homeUtil";
import { isEmpty, merge, assign } from "lodash";

const defaultHome = Object.freeze({
  homes: null,
  error: []
});

const HomeReducer = (state = defaultHome, action) => {
  Object.freeze(state);
  switch (action.type) {
    case homeUtil.GET_HOMES:
      console.log("******/homes REDUCER******");
      const homes = action.homes;
      let newState = Object.assign({}, state, { homes: homes });
      return newState;
    case homeUtil.GET_HOME:
      console.log("******/home REDUCER******");
      let home = action.home;
      newState = merge({}, { home: null, errors: [] }, { home: home });
      return newState;
    default:
      return state;
  }
};

export default HomeReducer;
