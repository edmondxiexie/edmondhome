import axios from "axios";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const signupUtil = userData => {
  return axios.post("/api/auth/signup", userData);
};

export const loginUtil = userData => {
  return axios.post("/api/auth/login", userData);
};

export const logoutUtil = () => {
  return new Promise((res, rej) => {
    res();
  });
};

export const setAuthorizationToken = token => {
  if (token) {
    // login
    axios.defaults.headers.common["Authorization"] = `Edmondhome ${token}`;
  } else {
    //logout
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const isUserExistsUtil = identifier => {
  return axios.get(`/api/auth/${identifier}`);
};
