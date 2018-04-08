import * as userUtil from "../utils/userUtil";

export const getProfile = profile => {
  return {
    type: userUtil.GET_USER_PROFILE,
    profile
  };
};

export const getUserProfile = id => {
  console.log("******pass user action******");
  return dispatch => {
    return userUtil.getUserProfile(id).then(res => {
      const profile = res.data;
      dispatch(getProfile(profile));
    });
  };
};

export const patchUserProfile = (id, userData) => {
  return dispatch => {
    return userUtil.putUserUtil(id, userData).then(res => {
      const profile = res.data;
      console.log("------profile----", profile);
      dispatch({
        type: userUtil.PUT_USER,
        profile: profile
      });
    });
  };
};
