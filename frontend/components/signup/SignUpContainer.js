import { connect } from "react-redux";
import SignUp from "./SignUp";
import * as authActions from "../../actions/authActions";
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
