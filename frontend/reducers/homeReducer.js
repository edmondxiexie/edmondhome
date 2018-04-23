import * as homeUtil from "../utils/homeUtil";
import { isEmpty, merge, assign } from "lodash";

const defaultHome = Object.freeze({
  homesCount: null,
  page: 1,
  homes: null,
  galleryHomes: null,
  home: null,
  searchStr: "",
  error: []
});

const HomeReducer = (state = defaultHome, action) => {
  Object.freeze(state);
  let homes, home, homesCount, page;
  switch (action.type) {
    case homeUtil.GET_HOMES:
      homes = action.homes;
      const newHomesState = Object.assign({}, state, { homes: homes });
      return newHomesState;
    case homeUtil.GET_HOME:
      home = action.home;
      const newHomeState = Object.assign({}, state, { home: home });
      return newHomeState;
    case homeUtil.DELETE_HOME:
      home = action.home;
      const newDeleteHomeState = Object.assign({}, state, { home: home });
      return newDeleteHomeState;
    case homeUtil.PUT_HOME:
      home = action.home;
      const newPutHomeState = Object.assign({}, state, { home: home });
      return newPutHomeState;
    case homeUtil.GET_HOMES_COUNT:
      homesCount = action.homesCount;
      const newHomesCountState = Object.assign({}, state, {
        homesCount: homesCount
      });
      return newHomesCountState;
    case homeUtil.GET_HOMES_PAGE:
      homes = action.homes;
      const newHomesPageState = Object.assign({}, state, {
        homes: homes,
        searchStr: ""
      });
      return newHomesPageState;
    case homeUtil.SET_HOMES_CURRENT_PAGE:
      page = action.page;
      const newPageState = Object.assign({}, state, { page: page });
      return newPageState;
    case homeUtil.GET_HOMES_SEARCH:
      homes = action.homes;
      const searchStr = action.searchStr;
      const newHomesSearchState = Object.assign({}, state, {
        homes: homes,
        searchStr: searchStr
      });
      return newHomesSearchState;
    case homeUtil.GET_GALLERY_HOMES:
      const galleryHomes = action.galleryHomes;
      const newGalleryHomesState = Object.assign({}, state, {
        galleryHomes: galleryHomes
      });
      return newGalleryHomesState;
    default:
      return state;
  }
};

export default HomeReducer;
