export const SET_ALERT = "SET_ALERT";

export const setAlert = alert => {
  return {
    type: SET_ALERT,
    alert
  };
};
