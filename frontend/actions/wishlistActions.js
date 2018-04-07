import * as wishlistUtil from "../utils/wishlistUtil";

export const getWishlist = wishlist => {
  return {
    type: wishlistUtil.GET_WISHLIST,
    wishlist
  };
};

export const getWishlistCount = wishlistCount => {
  return {
    type: wishlistUtil.GET_WISHLIST_COUNT,
    wishlistCount
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

export const fetchWishlistCount = keeperId => {
  console.log("******/wishlist/:keeper_id/count ACTION******");
  return dispatch => {
    return wishlistUtil.getWishlistCountUtil(keeperId).then(res => {
      const wishlistCount = res.data;
      localStorage.setItem("wishlistCount", wishlistCount);
      dispatch(getWishlistCount(wishlistCount));
    });
  };
};

export const addWishlist = wishData => {
  return dispatch => {
    return wishlistUtil.postWishlistUtil(wishData);
  };
};

export const deleteWishlist = id => {
  return dispatch => {
    return wishlistUtil.deleteWishlistUtil(id);
  };
};
