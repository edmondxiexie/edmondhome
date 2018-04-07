import axios from "axios";

// for reducer
export const GET_HOST_HOMES = "GET_HOST_HOMES";
export const GET_HOST_HOMES_COUNT = "GET_HOST_HOMES_COUNT";

// for util
export const getHostHomesUtil = hostID => {
  console.log("******/hosts/:host_id UTIL******");
  return axios.get(`/api/hosts/${hostID}`);
};

export const getHostHomesCountUtil = hostId => {
  console.log("******/hosts/:host_id/count UTIL******");
  return axios.get(`/api/hosts/${hostId}/count`);
};
