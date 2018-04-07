import axios from "axios";

// for reducer
export const GET_TRIPS = "GET_TRIPS";
export const GET_TRIPS_COUNT = "GET_TRIPS_COUNT";

// for util
export const getTripsUtil = GuestId => {
  console.log("******/trips/:guest_id UTIL******");
  return axios.get(`/api/trips/${GuestId}`);
};

export const getTripsCountUtil = GuestId => {
  console.log("******/trips/:guest_id/count UTIL******");
  return axios.get(`/api/trips/${GuestId}/count`);
};
