import * as userUtil from "../utils/userUtil";

export const getProfile = profile => {
  return {
    type: userUtil.GET_USER_PROFILE,
    profile
  };
};

export const fetchUserProfile = id => {
  return dispatch => {
    return userUtil.getUserProfile(id).then(res => {
      const profile = res.data;
      dispatch(getProfile(profile));
    });
  };
};

export const patchUserProfile = (id, userData, dataType) => {
  let type;
  switch (dataType) {
    case "basic":
      type = userUtil.PUT_USER_BASIC;
      break;
    case "avatar":
      type = userUtil.PUT_USER_AVATAR;
      break;
    case "password":
      type = userUtil.PUT_USER_PASSWORD;
      break;
  }

  return dispatch => {
    return userUtil.putUserUtil(id, userData, dataType).then(res => {
      const profile = res.data.user;
      dispatch({
        type: type,
        profile: profile
      });
      return res.data;
    });
  };
};
