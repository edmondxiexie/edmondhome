import { connect } from "react-redux";
import IndexHomePage from "./IndexHomePage";
import * as homeActions from "../../../actions/homeActions";
import * as wishlistActions from "../../../actions/wishlistActions";
import * as alertActions from "../../../actions/alertActions";

const mapStateToProps = state => {
  return {
    auth: state.auth,
    page: state.homes.page,
    homesCount: state.homes.homesCount,
    homes: state.homes.homes || [],
    wishlist: state.wishlist.wishlist || [],
    searchStr: state.homes.searchStr || ""
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHomes: () => {
      return dispatch(homeActions.fetchHomes());
    },
    fetchHomesPage: page => {
      return dispatch(homeActions.fetchHomesPage(page));
    },
    fetchHomesCount: () => {
      return dispatch(homeActions.fetchHomesCount());
    },
    fetchWishlist: keeperId => {
      return dispatch(wishlistActions.fetchWishlist(keeperId));
    },
    addWishlist: wishData => {
      return dispatch(wishlistActions.addWishlist(wishData));
    },
    deleteWishlist: id => {
      return dispatch(wishlistActions.deleteWishlist(id));
    },
    setAlert: alert => {
      return dispatch(alertActions.setAlert(alert));
    },
    fetchWishlistCount: keeperId => {
      return dispatch(wishlistActions.fetchWishlistCount(keeperId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexHomePage);
