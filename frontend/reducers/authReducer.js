import { SET_CURRENT_USER } from "../utils/authUtil";

import isEmpty from "lodash/isEmpty";

const defaultState = {
  isAuthenticated: false,
  user: {}
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};
