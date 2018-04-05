import axios from "axios";

export const GET_WISHLIST = "GET_WISHLIST";

export const getWishlistUtil = keeperId => {
  console.log("******/wishlist/:keeper_id UTIL******");
  return axios.get(`/api/wishlist/${keeperId}`);
};
