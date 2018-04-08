import { GET_USER_PROFILE, PUT_USER } from "../utils/userUtil";

const defaultProfile = Object.freeze({
  profile: {},
  errors: []
});

export default (state = defaultProfile, action) => {
  Object.freeze(state);
  let profile, newState;
  switch (action.type) {
    case GET_USER_PROFILE:
      console.log("pass GET_USER_PROFILE reducer");
      profile = action.profile;
      newState = Object.assign({}, state, {
        profile: profile
      });
      return newState;
    case PUT_USER:
      profile = action.profile;
      newState = Object.assign({}, state, {
        profile: profile
      });
      return newState;
    default:
      return state;
  }
};
