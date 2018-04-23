import axios from "axios";

// for reducer
export const GET_HOMES = "GET_HOMES";
export const GET_GALLERY_HOMES = "GET_GALLERY_HOMES";
export const GET_HOMES_PAGE = "GET_HOMES_PAGE";
export const GET_HOMES_COUNT = "GET_HOMES_COUNT";
export const SET_HOMES_CURRENT_PAGE = "SET_HOMES_CURRENT_PAGE";
export const GET_HOMES_SEARCH = "GET_HOMES_SEARCH";
export const GET_HOME = "GET_HOME";
export const PUT_HOME = "PUT_HOME";
export const DELETE_HOME = "DELETE_HOME";

// for util
export const getHomeUtil = id => {
  return axios.get(`/api/homes/${id}`);
};

export const deleteHomeUtil = id => {
  return axios.delete(`/api/homes/${id}`);
};

export const getHomesUtil = () => {
  return axios.get("/api/homes");
};

export const postHomeUtil = homeData => {
  return axios.post("/api/homes", homeData);
};

export const putHomeUtil = (id, homeData) => {
  return axios.put(`/api/homes/${id}/edit`, homeData);
};

export const getHomesPageUtil = page => {
  return axios.get(`/api/homes/pages/${page}`);
};

export const getHomesCountUtil = () => {
  return axios.get("/api/homes/count");
};

export const getGalleryHomesUtil = count => {
  return axios.get(`/api/homes/count/${count}`);
};
