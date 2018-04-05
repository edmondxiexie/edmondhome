import { combineReducers } from "redux";
import auth from "./authReducer";
import homes from "./homeReducer";
import profile from "./profileReducer";
import host from "./hostReducer";
import trips from "./tripReducer";
import wishlist from "./wishlistReducer";

export default combineReducers({
  auth,
  homes,
  profile,
  host,
  trips,
  wishlist
});
