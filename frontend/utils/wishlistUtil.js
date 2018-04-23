import axios from "axios";

export const GET_WISHLIST = "GET_WISHLIST";
export const GET_WISHLIST_COUNT = "GET_WISHLIST_COUNT";
export const GET_FAVORITE = "GET_FAVORITE";

export const getWishlistUtil = keeperId => {
  return axios.get(`/api/wishlist/${keeperId}`);
};
export const getWishlistCountUtil = keeperId => {
  return axios.get(`/api/wishlist/${keeperId}/count`);
};

export const postWishlistUtil = wishData => {
  return axios.post("/api/wishlist", wishData);
};

export const deleteWishlistUtil = id => {
  return axios.delete(`/api/wishlist/${id}`);
};

export const getFavoriteUtil = (keeperId, homeId) => {
  return axios.get(`/api/wishlist/${keeperId}/${homeId}`);
};
