import * as homeUtil from "../utils/homeUtil";

// for home reducer
export const getHomes = homes => {
  return {
    type: homeUtil.GET_HOMES,
    homes
  };
};

export const getHome = home => {
  return {
    type: homeUtil.GET_HOME,
    home
  };
};

//**** for home actions *****

export const fetchHome = id => {
  console.log("******/homes/:id ACTION******");
  return dispatch => {
    return homeUtil.getHomeUtil(id).then(res => {
      const home = res.data;
      localStorage.setItem("home", home);
      dispatch(getHome(home));
    });
  };
};

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
