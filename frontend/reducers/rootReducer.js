import { combineReducers } from "redux";
import auth from "./authReducer";
import homes from "./homeReducer";

export default combineReducers({
  auth,
  homes
});
