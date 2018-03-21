import axios from "axios";

export const GET_HOMES = "GET_HOMES";

export const getHomesUtil = () => {
  console.log("******/homes UTIL******");
  return axios.get("/api/homes");
};

export const postHomeUtil = homeData => {
  console.log("******/homes/new UTIL******");
  return axios.post("/api/homes", homeData);
};
