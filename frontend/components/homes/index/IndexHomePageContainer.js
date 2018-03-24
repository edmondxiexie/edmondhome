import { connect } from "react-redux";
import IndexHomePage from "./IndexHomePage";
import * as homeActions from "../../../actions/homeActions";

const mapStateToProps = state => {
  // debugger;
  return {
    homes: state.homes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHomes: () => {
      return dispatch(homeActions.fetchHomes());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexHomePage);
