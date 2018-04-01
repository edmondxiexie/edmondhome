import { connect } from "react-redux";
import IndexTripsPage from "./IndexTripsPage";
import * as tripsActions from "../../../actions/tripActions";

const mapStateToProps = state => {
  return {
    auth: state.auth,
    trips: state.trips.trips || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTrips: guestId => {
      return dispatch(tripsActions.fetchTrips(guestId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexTripsPage);
