import * as payUtil from "../utils/payUtil";

export const checkout = payData => {
  return dispatch => {
    return payUtil.postPayUtil(payData);
  };
};
