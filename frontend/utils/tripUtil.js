import axios from "axios";

// for reducer
export const GET_TRIPS = "GET_TRIPS";

// for util
export const getTripsUtil = GuestId => {
  console.log("******/trips/:guest_id UTIL******");
  return axios.get(`/api/trips/${GuestId}`);
};
