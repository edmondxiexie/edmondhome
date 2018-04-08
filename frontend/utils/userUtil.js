import axios from "axios";

export const GET_USER_PROFILE = "GET_USER_PROFILE";
export const PUT_USER = "PUT_USER";

export const getUserProfile = id => {
  console.log("******pass user util******");
  return axios.get(`/api/users/${id}`);
};

export const putUserUtil = (id, userData) => {
  console.log("******pass user util******");
  return axios.put(`/api/users/${id}/edit`, userData);
};
