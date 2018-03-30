import * as hostUtil from "../utils/hostUtil";

const defaultHost = Object.freeze({
  hostHomes: null,
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
    default:
      return state;
  }
};

export default HostReducer;
