import { connect } from "react-redux";
import Login from "./Login";
import * as authActions from "../../actions/authActions";
import * as hostActions from "../../actions/hostActions";
import * as tripActions from "../../actions/tripActions";
import * as wishlistActions from "../../actions/wishlistActions";
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: userData => {
      return dispatch(authActions.login(userData));
    },
    isUserExists: identifier => {
      return dispatch(authActions.isUserExists(identifier));
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
