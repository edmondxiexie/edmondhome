import { GET_WISHLIST } from "../utils/wishlistUtil";

const defaultWishlist = Object.freeze({
  wishlist: [],
  errors: []
});

export default (state = defaultWishlist, action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_WISHLIST:
      console.log("pass GET_WISHLIST reducer");
      const wishlist = action.wishlist;
      const newWishlistState = Object.assign({}, state, {
        wishlist: wishlist
      });
      return newWishlistState;
    default:
      return state;
  }
};
