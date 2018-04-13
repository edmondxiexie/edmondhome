import { connect } from "react-redux";
import DetailTripsPage from "./DetailTripsPage";
import * as tripsActions from "../../../actions/tripActions";
import * as alertActions from "../../../actions/alertActions";

const mapStateToProps = state => {
  return {
    auth: state.auth,
    trip: state.trips.trip
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrip: tripId => {
      return dispatch(tripsActions.fetchTrip(tripId));
    },
    addAlert: alert => {
      return dispatch(alertActions.addAlert(alert));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTripsPage);
