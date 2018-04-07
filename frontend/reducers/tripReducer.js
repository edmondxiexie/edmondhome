import * as tripUtil from "../utils/tripUtil";

const defaultTrips = Object.freeze({
  trips: [],
  tripsCount: null,
  errors: []
});

export default (state = defaultTrips, action) => {
  Object.freeze(state);
  switch (action.type) {
    case tripUtil.GET_TRIPS:
      console.log("pass GET_TRIPS reducer");
      const trips = action.trips;
      const newTripsState = Object.assign({}, state, {
        trips: trips
      });
      return newTripsState;
    case tripUtil.GET_TRIPS_COUNT:
      const tripsCount = action.tripsCount;
      const newTripsCountState = Object.assign({}, state, {
        tripsCount: tripsCount
      });
      return newTripsCountState;
    default:
      return state;
  }
};
