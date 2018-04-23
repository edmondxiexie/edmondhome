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
  return dispatch => {
    return wishlistUtil.getWishlistUtil(keeperId).then(res => {
      const wishlist = res.data;
      dispatch(getWishlist(wishlist));
    });
  };
};

export const fetchWishlistCount = keeperId => {
  return dispatch => {
    return wishlistUtil.getWishlistCountUtil(keeperId).then(res => {
      const wishlistCount = res.data;
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

export const getFavorite = (keeperId, homeId) => {
  return dispatch => {
    return wishlistUtil.getFavoriteUtil(keeperId, homeId).then(res => {
      const favorite = res.data;
      dispatch({
        type: wishlistUtil.GET_FAVORITE,
        favorite
      });
    });
  };
};
