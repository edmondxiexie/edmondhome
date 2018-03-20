import * as authUtil from "../utils/authUtil";

export const userSignupRequest = userData => {
  console.log("pass user sign up action");
  return dispatch => {
    return authUtil.userSignupUtil(userData);
  };
};
