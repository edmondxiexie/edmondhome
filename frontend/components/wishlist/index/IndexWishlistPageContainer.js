import { connect } from "react-redux";
import IndexWishlistPage from "./IndexWishlistPage";
import * as wishlistActions from "../../../actions/wishlistActions";
import * as alertActions from "../../../actions/alertActions";

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
    },
    addAlert: alert => {
      return dispatch(alertActions.addAlert(alert));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexWishlistPage);
