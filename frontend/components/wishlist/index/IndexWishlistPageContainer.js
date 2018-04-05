import { connect } from "react-redux";
import IndexWishlistPage from "./IndexWishlistPage";
import * as wishlistActions from "../../../actions/wishlistActions";

const mapStateToProps = state => {
  return {
    auth: state.auth,
    wishlist: state.wishlist.wishlist || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWishlist: keeperId => {
      return dispatch(wishlistActions.fetchWishlist(keeperId));
    },
    addWishlist: wishData => {
      return dispatch(wishlistActions.addWishlist(wishData));
    },
    deleteWishlist: id => {
      return dispatch(wishlistActions.deleteWishlist(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexWishlistPage);
