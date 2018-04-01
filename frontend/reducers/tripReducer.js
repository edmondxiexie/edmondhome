import { GET_TRIPS } from "../utils/tripUtil";

const defaultTrips = Object.freeze({
  trips: {},
  errors: []
});

export default (state = defaultTrips, action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_TRIPS:
      console.log("pass GET_TRIPS reducer");
      const trips = action.trips;
      const newTripsState = Object.assign({}, state, {
        trips: trips
      });
      return newTripsState;
    default:
      return state;
  }
};
