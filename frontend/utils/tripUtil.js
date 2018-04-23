import axios from "axios";

// for reducer
export const GET_TRIPS = "GET_TRIPS";
export const GET_TRIPS_FROM_HOME = "GET_TRIPS_FROM_HOME";
export const GET_TRIP = "GET_TRIP";
export const GET_TRIPS_COUNT = "GET_TRIPS_COUNT";

// for util
export const getTripsUtil = guestId => {
  return axios.get(`/api/trips/${guestId}`);
};

export const getTripsFromHomeUtil = homeId => {
  return axios.get(`/api/trips/home/${homeId}`);
};

export const getTripsCountUtil = guestId => {
  return axios.get(`/api/trips/${guestId}/count`);
};

export const getTripUtil = tripId => {
  return axios.get(`/api/trips/trip/${tripId}`);
};

export const postTripUtil = tripData => {
  return axios.post("/api/trips", tripData);
};
