import * as tripUtil from "../utils/tripUtil";

const defaultTrips = Object.freeze({
  trip: {},
  tripsFromHome: [],
  trips: [],
  tripsCount: null,
  errors: []
});

export default (state = defaultTrips, action) => {
  Object.freeze(state);
  switch (action.type) {
    case tripUtil.GET_TRIPS:
      const trips = action.trips;
      const newTripsState = Object.assign({}, state, {
        trips: trips
      });
      return newTripsState;
    case tripUtil.GET_TRIPS_FROM_HOME:
      const tripsFromHome = action.tripsFromHome;
      const newTripsFromHomeState = Object.assign({}, state, {
        tripsFromHome: tripsFromHome
      });
      return newTripsFromHomeState;
    case tripUtil.GET_TRIPS_COUNT:
      const tripsCount = action.tripsCount;
      const newTripsCountState = Object.assign({}, state, {
        tripsCount: tripsCount
      });
      return newTripsCountState;

    case tripUtil.GET_TRIP:
      const trip = action.trip;
      const newTripState = Object.assign({}, state, {
        trip: trip
      });
      return newTripState;
    default:
      return state;
  }
};
