import axios from "axios";

export const GET_USER_PROFILE = "GET_USER_PROFILE";
export const PUT_USER = "PUT_USER";
export const PUT_USER_AVATAR = "PUT_USER_AVATAR";
export const PUT_USER_PASSWORD = "PUT_USER_PASSWORD";

export const getUserProfile = id => {
  console.log("******pass getUserProfile util******");
  return axios.get(`/api/users/${id}`);
};

export const putUserUtil = (id, userData) => {
  console.log("******pass putUserUtil util******");
  return axios.put(`/api/users/${id}/edit`, userData);
};

export const putUserAvatarUtil = (id, userData) => {
  console.log("******pass putUserAvatarUtil util******");
  return axios.put(`/api/users/${id}/edit/avatar`, userData);
};

export const putUserPasswordUtil = (id, userData) => {
  console.log("******pass putUserPasswordUtil util******");
  return axios.put(`/api/users/${id}/edit/password`, userData);
};
