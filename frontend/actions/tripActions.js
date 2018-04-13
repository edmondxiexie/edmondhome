import * as tripUtil from "../utils/tripUtil";

// For trip reducer
export const getTrips = trips => {
  return {
    type: tripUtil.GET_TRIPS,
    trips
  };
};

export const getTrip = trip => {
  return {
    type: tripUtil.GET_TRIP,
    trip
  };
};

export const getTripsCount = tripsCount => {
  return {
    type: tripUtil.GET_TRIPS_COUNT,
    tripsCount
  };
};

// For trip actions

export const fetchTrips = guestId => {
  console.log("******/trips/:guest_id ACTION******");
  return dispatch => {
    return tripUtil.getTripsUtil(guestId).then(res => {
      const trips = res.data;
      dispatch(getTrips(trips));
    });
  };
};

export const fetchTrip = tripId => {
  console.log("******/trips/trip/:trip_id ACTION******");
  return dispatch => {
    return tripUtil.getTripUtil(tripId).then(res => {
      const trip = res.data.trip;
      dispatch(getTrip(trip));
      return res.data;
    });
  };
};

export const fetchTripsCount = guestId => {
  console.log("******/trips/:guest_id/count ACTION******");
  return dispatch => {
    return tripUtil.getTripsCountUtil(guestId).then(res => {
      const tripsCount = res.data;
      dispatch(getTripsCount(tripsCount));
    });
  };
};
