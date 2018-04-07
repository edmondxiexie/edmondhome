import axios from "axios";

export const GET_WISHLIST = "GET_WISHLIST";
export const GET_WISHLIST_COUNT = "GET_WISHLIST_COUNT";

export const getWishlistUtil = keeperId => {
  console.log("******/wishlist/:keeper_id UTIL******");
  return axios.get(`/api/wishlist/${keeperId}`);
};
export const getWishlistCountUtil = keeperId => {
  console.log("******/wishlist/:keeper_id/count UTIL******");
  return axios.get(`/api/wishlist/${keeperId}/count`);
};

export const postWishlistUtil = wishData => {
  console.log("******/wishlist UTIL******");
  return axios.post("/api/wishlist", wishData);
};

export const deleteWishlistUtil = id => {
  console.log("******/wishlist/:id UTIL******");
  return axios.delete(`/api/wishlist/${id}`);
};
