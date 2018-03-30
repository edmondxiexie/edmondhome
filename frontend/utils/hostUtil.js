import axios from "axios";

// for reducer
export const GET_HOST_HOMES = "GET_HOST_HOMES";

// for util
export const getHostHomesUtil = hostID => {
  console.log("******/hosts/:host_id UTIL******");
  return axios.get(`/api/hosts/${hostID}`);
};
