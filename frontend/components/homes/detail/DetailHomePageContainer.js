import { connect } from "react-redux";
import DetailHomePage from "./DetailHomePage";
import * as homeActions from "../../../actions/homeActions";
import * as wishlistActions from "../../../actions/wishlistActions";
import * as tripActions from "../../../actions/tripActions";
import * as payActions from "../../../actions/payActions";
import * as alertActions from "../../../actions/alertActions";

const mapStateToProps = state => {
  let home = {};
  if (state.homes.home) {
    home = state.homes.home;
  }
  return {
    auth: state.auth,
    home: home,
    favorite: state.wishlist.favorite,
    trips: state.trips.tripsFromHome
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
    },
    fetchTripsFromHome: homeId => {
      return dispatch(tripActions.fetchTripsFromHome(homeId));
    },
    fetchTripsCount: guestId => {
      return dispatch(tripActions.fetchTripsCount(guestId));
    },
    createTrip: tripData => {
      return dispatch(tripActions.createTrip(tripData));
    },
    checkout: payData => {
      return dispatch(payActions.checkout(payData));
    },
    addAlert: alert => {
      return dispatch(alertActions.addAlert(alert));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHomePage);
