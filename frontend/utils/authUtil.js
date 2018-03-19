import axios from "axios";

import { SET_CURRENT_USER } from "../actions/authActions";

export const userSignupUtil = userData => {
  //   debugger;
  console.log("pass util");
  return axios.post("/api/users", userData);
};
