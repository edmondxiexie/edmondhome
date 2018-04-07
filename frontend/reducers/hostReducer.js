import * as hostUtil from "../utils/hostUtil";

const defaultHost = Object.freeze({
  hostHomes: null,
  hostHomesCount: null,
  errors: []
});

const HostReducer = (state = defaultHost, action) => {
  Object.freeze(state);
  switch (action.type) {
    case hostUtil.GET_HOST_HOMES:
      console.log("pass GET_HOST_HOME reducer");
      const hostHomes = action.hostHomes;
      let newState = Object.assign({}, state, {
        hostHomes: hostHomes
      });
      return newState;
    case hostUtil.GET_HOST_HOMES_COUNT:
      console.log("******/host REDUCER GET******");
      let hostHomesCount = action.hostHomesCount;
      let newHostHomesCountState = Object.assign({}, state, {
        hostHomesCount: hostHomesCount
      });
      return newHostHomesCountState;
    default:
      return state;
  }
};

export default HostReducer;
