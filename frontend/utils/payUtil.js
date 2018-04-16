import axios from "axios";

export const postPayUtil = payData => {
  console.log("******/pay UTIL******");
  return axios.post("/api/pay", payData);
};
