import * as userUtil from "../utils/userUtil";

export const setProfile = profile => {
  return {
    type: userUtil.GET_USER_PROFILE,
    profile
  };
};

export const getUserProfile = id => {
  console.log("******pass user action******");
  return dispatch => {
    return userUtil.getUserProfile(id).then(res => {
      const profile = res.data.profile;
      dispatch(setProfile(profile));
    });
  };
};
