import axios from "axios";

export const postPayUtil = payData => {
  return axios.post("/api/pay", payData);
};
