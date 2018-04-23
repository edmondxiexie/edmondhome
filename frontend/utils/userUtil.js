import axios from "axios";

export const GET_USER_PROFILE = "GET_USER_PROFILE";
export const PUT_USER_BASIC = "PUT_USER_BASIC";
export const PUT_USER_AVATAR = "PUT_USER_AVATAR";
export const PUT_USER_PASSWORD = "PUT_USER_PASSWORD";

export const getUserProfile = id => {
  return axios.get(`/api/users/${id}`);
};

export const putUserUtil = (id, userData, dataType) => {
  switch (dataType) {
    case "basic":
      return axios.put(`/api/users/${id}/edit/basic`, userData);
    case "avatar":
      return axios.put(`/api/users/${id}/edit/avatar`, userData);
    case "password":
      return axios.put(`/api/users/${id}/edit/password`, userData);
  }
};
