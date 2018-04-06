import { SET_ALERT } from "../actions/alertActions";

const defaultState = {
  alert: null
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_ALERT:
      console.log("pass SET_ALERT reducer");
      return { alert: action.alert };
    default:
      return state;
  }
};
