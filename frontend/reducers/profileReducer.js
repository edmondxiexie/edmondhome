import { GET_USER_PROFILE } from "../utils/userUtil";

const defaultProfile = Object.freeze({
  profile: {},
  errors: []
});

export default (state = defaultProfile, action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_USER_PROFILE:
      console.log("pass GET_USER_PROFILE reducer");
      const profile = action.profile;
      let newProfileState = Object.assign({}, state, {
        profile: profile
      });
      return newProfileState;
    default:
      return state;
  }
};
