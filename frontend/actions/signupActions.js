import * as authUtil from "../utils/authUtil";

export const userSignupRequest = userData => {
  console.log("pass action");
  //   debugger;
  return dispatch => {
    return authUtil.userSignupUtil(userData);
  };
};
