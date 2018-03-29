import { GET_USER_PROFILE } from "../utils/userUtil";

const defaultState = {
  profile: {}
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      console.log("pass GET_USER_PROFILE reducer");
      return {
        profile: action.profile
      };
    default:
      return state;
  }
};
