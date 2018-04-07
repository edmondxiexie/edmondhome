import * as homeUtil from "../utils/homeUtil";

// for home reducer
export const getHomes = homes => {
  return {
    type: homeUtil.GET_HOMES,
    homes
  };
};

export const getHomesCount = homesCount => {
  return {
    type: homeUtil.GET_HOMES_COUNT,
    homesCount
  };
};

export const getHomesPage = homes => {
  return {
    type: homeUtil.GET_HOMES_PAGE,
    homes
  };
};

export const getHome = home => {
  return {
    type: homeUtil.GET_HOME,
    home
  };
};

export const putHome = home => {
  return {
    type: homeUtil.PUT_HOME,
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

export const fetchHomesPage = page => {
  return dispatch => {
    return homeUtil.getHomesPageUtil(page).then(res => {
      const homes = res.data;
      localStorage.setItem(`homes-${page}`, homes);
      dispatch(getHomesPage(homes));
    });
  };
};

export const fetchHomesCount = () => {
  return dispatch => {
    return homeUtil.getHomesCountUtil().then(res => {
      const homesCount = res.data;
      localStorage.setItem("homesCount", homesCount);
      dispatch(getHomesCount(homesCount));
    });
  };
};

export const createHome = homeData => {
  return dispatch => {
    return homeUtil.postHomeUtil(homeData);
  };
};

export const patchHome = (id, homeData) => {
  console.log("******/home/:id/edit ACTION PUT******");
  return dispatch => {
    return homeUtil.putHomeUtil(id, homeData).then(res => {
      const home = res.data;
      localStorage.setItem("home", home);
      dispatch(putHome(home));
    });
  };
};
