import * as userUtil from "../utils/userUtil";

const defaultProfile = Object.freeze({
  profile: {},
  errors: []
});

export default (state = defaultProfile, action) => {
  Object.freeze(state);
  let profile, newState;
  switch (action.type) {
    case userUtil.GET_USER_PROFILE:
      console.log("pass GET_USER_PROFILE reducer");
      profile = action.profile;
      newState = Object.assign({}, state, {
        profile: profile
      });
      return newState;
    case userUtil.PUT_USER_BASIC:
      profile = action.profile;
      const newBasicProfile = Object.assign({}, state.profile, profile);
      newState = Object.assign({}, state, {
        profile: newBasicProfile
      });
      return newState;
    case userUtil.PUT_USER_AVATAR:
      profile = action.profile;
      const newAvatarProfile = Object.assign({}, state.profile, profile);
      newState = Object.assign({}, state, {
        profile: newAvatarProfile
      });
      return newState;
    case userUtil.PUT_USER_PASSWORD:
      profile = action.profile;
      const newPasswordProfile = Object.assign({}, state.profile, profile);
      newState = Object.assign({}, state, {
        profile: newPasswordProfile
      });
      return newState;
    default:
      return state;
  }
};
