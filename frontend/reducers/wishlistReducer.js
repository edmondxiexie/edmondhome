import * as wishlistUtil from "../utils/wishlistUtil";

const defaultWishlist = Object.freeze({
  wishlist: [],
  wishlistCount: null,
  favorite: null,
  errors: []
});

export default (state = defaultWishlist, action) => {
  Object.freeze(state);
  switch (action.type) {
    case wishlistUtil.GET_WISHLIST:
      console.log("pass GET_WISHLIST reducer");
      const wishlist = action.wishlist;
      const newWishlistState = Object.assign({}, state, {
        wishlist: wishlist
      });
      return newWishlistState;
    case wishlistUtil.GET_WISHLIST_COUNT:
      console.log("pass GET_WISHLIST_COUNT reducer");
      const wishlistCount = action.wishlistCount;
      const newWishlistCountState = Object.assign({}, state, {
        wishlistCount: wishlistCount
      });
      return newWishlistCountState;
    case wishlistUtil.GET_FAVORITE:
      const favorite = action.favorite;
      const newFavoriteState = Object.assign({}, state, {
        favorite: favorite
      });
      return newFavoriteState;
    default:
      return state;
  }
};
