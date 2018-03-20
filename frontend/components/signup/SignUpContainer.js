import { connect } from "react-redux";
import SignUp from "./SignUp";
import { signup, isUserExists } from "../../actions/authActions";
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    signup: userData => {
      return dispatch(signup(userData));
    },
    isUserExists: identifier => {
      return dispatch(isUserExists(identifier));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
