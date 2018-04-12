import { connect } from "react-redux";
import SignUp from "./SignUp";
import * as authActions from "../../actions/authActions";
import * as alertActions from "../../actions/alertActions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    signup: userData => {
      return dispatch(authActions.signup(userData));
    },
    login: userData => {
      return dispatch(authActions.login(userData));
    },
    isUserExists: identifier => {
      return dispatch(authActions.isUserExists(identifier));
    },
    addAlert: alert => {
      return dispatch(alertActions.addAlert(alert));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
