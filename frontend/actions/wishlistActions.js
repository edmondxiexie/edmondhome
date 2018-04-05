import * as wishlistUtil from "../utils/wishlistUtil";

export const getWishlist = wishlist => {
  return {
    type: wishlistUtil.GET_WISHLIST,
    wishlist
  };
};

export const fetchWishlist = keeperId => {
  console.log("******/wishlist/:keeper_id ACTION******");
  return dispatch => {
    return wishlistUtil.getWishlistUtil(keeperId).then(res => {
      const wishlist = res.data;
      localStorage.setItem("wishlist", wishlist);
      dispatch(getWishlist(wishlist));
    });
  };
};
