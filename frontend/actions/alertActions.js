export const ADD_ALERT = "ADD_ALERT";
export const DELETE_ALERT = "DELETE_ALERT";

export const addAlert = alert => {
  return {
    type: ADD_ALERT,
    alert
  };
};

export const deleteAlert = id => {
  return {
    type: DELETE_ALERT,
    id
  };
};
