import { connect } from "react-redux";
import IndexTripsPage from "./IndexTripsPage";
import * as tripsActions from "../../../actions/tripActions";
import * as alertActions from "../../../actions/alertActions";

const mapStateToProps = state => {
  return {
    auth: state.auth,
    trips: state.trips.trips || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrips: guestId => {
      return dispatch(tripsActions.fetchTrips(guestId));
    },
    addAlert: alert => {
      return dispatch(alertActions.addAlert(alert));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexTripsPage);
