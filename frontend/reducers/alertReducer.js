import * as alertActions from "../actions/alertActions";
import shortid from "shortid";

export default (state = [], action) => {
  switch (action.type) {
    case alertActions.ADD_ALERT:
      console.log("pass ADD_ALERT reducer");
      const addArray = state.slice();
      let newAlert = action.alert;
      newAlert["id"] = shortid.generate();
      addArray.push(newAlert);
      return addArray;
    case alertActions.DELETE_ALERT:
      const copyArray = state.slice();
      const deleteArray = copyArray.filter(alert => alert.id !== action.id);
      return deleteArray;
    default:
      return state;
  }
};
