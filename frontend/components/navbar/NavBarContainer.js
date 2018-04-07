import { connect } from "react-redux";
import NavBar from "./NavBar";
import { logout } from "../../actions/authActions";
import * as hostActions from "../../actions/hostActions";
import * as tripActions from "../../actions/tripActions";
import * as wishlistActions from "../../actions/wishlistActions";

const mapStateToProps = state => {
  //   debugger;
  return {
    auth: state.auth,
    hostHomesCount: state.host.hostHomesCount,
    tripsCount: state.trips.tripsCount,
    wishlistCount: state.wishlist.wishlistCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      return dispatch(logout());
    },
    fetchHostHomesCount: hostId => {
      return dispatch(hostActions.fetchHostHomesCount(hostId));
    },
    fetchTripsCount: guestId => {
      return dispatch(tripActions.fetchTripsCount(guestId));
    },
    fetchWishlistCount: keeperId => {
      return dispatch(wishlistActions.fetchWishlistCount(keeperId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
