import { connect } from "react-redux";
import * as homeActions from "../../../actions/homeActions";
import * as alertActions from "../../../actions/alertActions";
import NewHomePage from "./NewHomePage";

const mapStateToProps = state => {
  // debugger;
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createHome: data => {
      return dispatch(homeActions.createHome(data));
    },
    addAlert: alert => {
      return dispatch(alertActions.addAlert(alert));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewHomePage);
