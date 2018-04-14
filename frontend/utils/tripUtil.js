import axios from "axios";

// for reducer
export const GET_TRIPS = "GET_TRIPS";
export const GET_TRIP = "GET_TRIP";
export const GET_TRIPS_COUNT = "GET_TRIPS_COUNT";

// for util
export const getTripsUtil = guestId => {
  console.log("******/trips/:guest_id UTIL******");
  return axios.get(`/api/trips/${guestId}`);
};

export const getTripsCountUtil = guestId => {
  console.log("******/trips/:guest_id/count UTIL******");
  return axios.get(`/api/trips/${guestId}/count`);
};

export const getTripUtil = tripId => {
  console.log("******/trips/trip/:trip_id UTIL******");
  return axios.get(`/api/trips/trip/${tripId}`);
};

export const postTripUtil = tripData => {
  console.log("******/trips UTIL******");
  return axios.post("/api/trips", tripData);
};
