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

// export const patchUserAvatarProfile = (id, userData) => {
//   return dispatch => {
//     return userUtil.putUserAvatarUtil(id, userData).then(res => {
//       const profile = res.data.user;
//       dispatch({
//         type: userUtil.PUT_USER_AVATAR,
//         profile: profile
//       });
//       return res.data;
//     });
//   };
// };

// export const patchUserPasswordProfile = (id, userData) => {
//   return dispatch => {
//     return userUtil.putUserPasswordUtil(id, userData).then(res => {
//       const profile = res.data.user;
//       dispatch({
//         type: userUtil.PUT_USER_PASSWORD,
//         profile: profile
//       });
//       return res.data;
//     });
//   };
// };
