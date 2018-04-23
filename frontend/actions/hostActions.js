import * as hostUtil from "../utils/hostUtil";

// for host reducer
export const getHostHomes = hostHomes => {
  return {
    type: hostUtil.GET_HOST_HOMES,
    hostHomes
  };
};

export const getHostHomesCount = hostHomesCount => {
  return {
    type: hostUtil.GET_HOST_HOMES_COUNT,
    hostHomesCount
  };
};

// for host actions

export const fetchHostHomes = hostID => {
  return dispatch => {
    return hostUtil.getHostHomesUtil(hostID).then(res => {
      const hostHomes = res.data;
      dispatch(getHostHomes(hostHomes));
    });
  };
};

export const fetchHostHomesCount = hostId => {
  return dispatch => {
    return hostUtil.getHostHomesCountUtil(hostId).then(res => {
      const hostHomesCount = res.data;
      dispatch(getHostHomesCount(hostHomesCount));
    });
  };
};
