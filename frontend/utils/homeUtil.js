import axios from "axios";

export const GET_HOMES = "GET_HOMES";
export const GET_HOME = "GET_HOME";

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
