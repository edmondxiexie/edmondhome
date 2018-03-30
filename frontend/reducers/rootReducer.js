import { combineReducers } from "redux";
import auth from "./authReducer";
import homes from "./homeReducer";
import profile from "./profileReducer";
import host from "./hostReducer";

export default combineReducers({
  auth,
  homes,
  profile,
  host
});
