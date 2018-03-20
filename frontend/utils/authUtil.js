import axios from "axios";

import { SET_CURRENT_USER } from "../actions/authActions";

export const userSignupUtil = userData => {
  console.log("pass sign up util");
  return axios.post("/api/users", userData);
};
