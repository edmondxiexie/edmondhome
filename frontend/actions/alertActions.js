export const SET_ALERT = "SET_ALERT";
export const DELETE_ALERT = "DELETE_ALERT";

export const setAlert = alert => {
  return {
    type: SET_ALERT,
    alert
  };
};

export const deleteAlert = id => {
  return {
    type: DELETE_ALERT,
    id
  };
};
