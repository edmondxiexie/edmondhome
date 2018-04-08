import { connect } from "react-redux";
import DetailHomePage from "./DetailHomePage";
import * as homeActions from "../../../actions/homeActions";
import * as wishlistActions from "../../../actions/wishlistActions";

const mapStateToProps = state => {
  let home = {};
  if (state.homes.home) {
    home = state.homes.home;
  }
  return {
    auth: state.auth,
    home: home,
    favorite: state.wishlist.favorite
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHome: id => {
      return dispatch(homeActions.fetchHome(id));
    },
    getFavorite: (keeperId, homeId) => {
      return dispatch(wishlistActions.getFavorite(keeperId, homeId));
    },
    addWishlist: wishData => {
      return dispatch(wishlistActions.addWishlist(wishData));
    },
    deleteWishlist: id => {
      return dispatch(wishlistActions.deleteWishlist(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHomePage);
