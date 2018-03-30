import * as hostUtil from "../utils/hostUtil";

// for host reducer
export const getHostHomes = hostHomes => {
  return {
    type: hostUtil.GET_HOST_HOMES,
    hostHomes
  };
};

// for host actions

export const fetchHostHomes = hostID => {
  console.log("******/host/:host_id ACTION******");
  return dispatch => {
    return hostUtil.getHostHomesUtil(hostID).then(res => {
      const hostHomes = res.data;
      localStorage.setItem("hostHomes", hostHomes);
      dispatch(getHostHomes(hostHomes));
    });
  };
};
