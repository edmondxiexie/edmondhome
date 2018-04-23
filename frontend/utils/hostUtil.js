import axios from "axios";

// for reducer
export const GET_HOST_HOMES = "GET_HOST_HOMES";
export const GET_HOST_HOMES_COUNT = "GET_HOST_HOMES_COUNT";

// for util
export const getHostHomesUtil = hostID => {
  return axios.get(`/api/hosts/${hostID}`);
};

export const getHostHomesCountUtil = hostId => {
  return axios.get(`/api/hosts/${hostId}/count`);
};
