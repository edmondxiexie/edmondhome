import * as tripUtil from "../utils/tripUtil";

// For trip reducer
export const getTrips = trips => {
  return {
    type: tripUtil.GET_TRIPS,
    trips
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
      localStorage.setItem("trips", trips);
      dispatch(getTrips(trips));
    });
  };
};

export const fetchTripsCount = guestId => {
  console.log("******/trips/:guest_id/count ACTION******");
  return dispatch => {
    return tripUtil.getTripsCountUtil(guestId).then(res => {
      const tripsCount = res.data;
      localStorage.setItem("tripsCount", tripsCount);
      dispatch(getTripsCount(tripsCount));
    });
  };
};
