import axios from "axios";

export const GET_USER_PROFILE = "GET_USER_PROFILE";

export const getUserProfile = id => {
  console.log("******pass user util******");
  return axios.get(`/api/users/${id}`);
};
