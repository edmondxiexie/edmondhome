import { combineReducers } from "redux";
import auth from "./authReducer";
import homes from "./homeReducer";
import profile from "./profileReducer";
export default combineReducers({
  auth,
  homes,
  profile
});
