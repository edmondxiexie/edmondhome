import * as authUtil from "../utils/authUtil";
import jwtDecode from "jwt-decode";

export const setCurrentUser = user => {
  return {
    type: authUtil.SET_CURRENT_USER,
    user
  };
};

export const signup = userData => {
  console.log("******/signup ACTION******");
  return dispatch => {
    return authUtil.signupUtil(userData);
  };
};

export const login = userData => {
  console.log("******/login ACTION******");
  return dispatch => {
    return authUtil.loginUtil(userData).then(res => {
      const token = res.data.token;
      const userInfo = jwtDecode(token);
      localStorage.setItem("jwtToken", token);
      authUtil.setAuthorizationToken(token);
      dispatch(setCurrentUser(userInfo));
    });
  };
};

export const logout = () => {
  console.log("******/logout ACTION******");
  return dispatch => {
    return authUtil.logoutUtil().then(() => {
      localStorage.removeItem("jwtToken");
      authUtil.setAuthorizationToken(false);
      dispatch(setCurrentUser({}));
    });
  };
};

export const isUserExists = identifier => {
  console.log("******pass auth action******");
  return dispatch => {
    return authUtil.isUserExistsUtil(identifier);
  };
};
