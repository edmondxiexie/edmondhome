import { SET_CURRENT_USER } from "../actions/authActions";

import isEmpty from "lodash/isEmpty";

const defaultState = {
  isAuthenticated: false,
  user: {}
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log("pass SET_CURRENT_USER reducer");
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};
