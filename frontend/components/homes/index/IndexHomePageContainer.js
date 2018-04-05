import { connect } from "react-redux";
import IndexHomePage from "./IndexHomePage";
import * as homeActions from "../../../actions/homeActions";
import * as wishlistActions from "../../../actions/wishlistActions";

const mapStateToProps = state => {
  return {
    auth: state.auth,
    homes: state.homes.homes,
    wishlist: state.wishlist.wishlist || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHomes: () => {
      return dispatch(homeActions.fetchHomes());
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(IndexHomePage);
