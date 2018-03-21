import * as homeUtil from "../utils/homeUtil";

// for home reducer
export const getHomes = homes => {
  return {
    type: homeUtil.GET_HOMES,
    homes
  };
};

// for home actions
export const fetchHomes = () => {
  return dispatch => {
    return homeUtil.getHomesUtil().then(res => {
      const homes = res.data;
      localStorage.setItem("homes", homes);
      dispatch(getHomes(homes));
    });
  };
};

export const createHome = homeData => {
  return dispatch => {
    return homeUtil.postHomeUtil(homeData);
  };
};
