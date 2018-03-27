import { connect } from "react-redux";
import Login from "./Login";
import * as authActions from "../../actions/authActions";
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    login: userData => {
      return dispatch(authActions.login(userData));
    },
    isUserExists: identifier => {
      return dispatch(authActions.isUserExists(identifier));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
