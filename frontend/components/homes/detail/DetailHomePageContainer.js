import { connect } from "react-redux";
import DetailHomePage from "./DetailHomePage";
import * as homeActions from "../../../actions/homeActions";

const mapStateToProps = state => {
  let home = {};
  if (state.homes.home) {
    home = state.homes.home;
  }
  return {
    home: home
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHome: id => {
      return dispatch(homeActions.fetchHome(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHomePage);
