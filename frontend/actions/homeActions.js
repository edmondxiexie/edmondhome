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

export const setCurrentPage = page => {
  return {
    type: homeUtil.SET_HOMES_CURRENT_PAGE,
    page
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
      dispatch(getHome(home));
    });
  };
};

export const fetchHomes = () => {
  return dispatch => {
    return homeUtil.getHomesUtil().then(res => {
      const homes = res.data;
      dispatch(getHomes(homes));
    });
  };
};

export const fetchHomesPage = page => {
  return dispatch => {
    return homeUtil.getHomesPageUtil(page).then(res => {
      const homes = res.data;
      dispatch(setCurrentPage(page));
      dispatch(getHomesPage(homes));
    });
  };
};

export const fetchHomesCount = () => {
  return dispatch => {
    return homeUtil.getHomesCountUtil().then(res => {
      const homesCount = res.data;
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
      dispatch(putHome(home));
    });
  };
};

export const fetchHomesByKeywords = keywords => {
  return dispatch => {
    return homeUtil.getHomesUtil().then(res => {
      const homes = res.data;
      const newHomes = [];
      const newHomesMap = {};
      for (let home of homes) {
        for (let keyword of keywords) {
          if (home.title.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
            newHomesMap[home.id] = true;
          }
          if (
            home.description.toLowerCase().indexOf(keyword.toLowerCase()) != -1
          ) {
            newHomesMap[home.id] = true;
          }
          if (
            home.district.toLowerCase().indexOf(keyword.toLowerCase()) != -1
          ) {
            newHomesMap[home.id] = true;
          }
          if (home.target.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
            newHomesMap[home.id] = true;
          }
        }
      }

      for (let home of homes) {
        if (newHomesMap[home.id]) {
          newHomes.push(home);
        }
      }

      dispatch(getHomesCount(newHomes.length));
      dispatch(getHomes(newHomes));
    });
  };
};
