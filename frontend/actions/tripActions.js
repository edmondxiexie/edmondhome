import * as tripUtil from "../utils/tripUtil";

// For trip reducer
export const getTrips = trips => {
  return {
    type: tripUtil.GET_TRIPS,
    trips
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
