import * as alertActions from "../actions/alertActions";
import shortid from "shortid";

export default (state = [], action) => {
  switch (action.type) {
    case alertActions.SET_ALERT:
      console.log("pass SET_ALERT reducer");
      const addArray = state.slice();
      let newAlert = action.alert;
      newAlert["id"] = shortid.generate();
      addArray.push(newAlert);
      // console.log(addArray);
      // debugger;
      return addArray;
    case alertActions.DELETE_ALERT:
      const copyArray = state.slice();
      return copyArray.filter(alert => alert.id !== action.id);
    default:
      return state;
  }
};
