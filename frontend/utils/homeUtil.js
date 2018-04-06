import axios from "axios";

// for reducer
export const GET_HOMES = "GET_HOMES";
export const GET_HOMES_PAGE = "GET_HOMES_PAGE";
export const GET_HOMES_COUNT = "GET_HOMES_COUNT";

export const GET_HOME = "GET_HOME";
export const PUT_HOME = "PUT_HOME";

// for util
export const getHomeUtil = id => {
  console.log("******/homes/:id UTIL******");
  return axios.get(`/api/homes/${id}`);
};

export const getHomesUtil = () => {
  console.log("******/homes UTIL******");
  return axios.get("/api/homes");
};

export const postHomeUtil = homeData => {
  console.log("******/homes/new UTIL******");
  return axios.post("/api/homes", homeData);
};

export const putHomeUtil = (id, homeData) => {
  console.log("******/homes/:id/edit UTIL******");
  return axios.put(`/api/homes/${id}/edit`, homeData);
};

export const getHomesPageUtil = page => {
  console.log("******/homes/pages/:page UTIL******");
  return axios.get(`/api/homes/pages/${page}`);
};

export const getHomesCountUtil = () => {
  console.log("******/homes/count UTIL******");
  return axios.get("/api/homes/count");
};
