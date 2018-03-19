import { connect } from "react-redux";
import SignUp from "./SignUp";
import { userSignupRequest } from "../../actions/signupActions";
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    userSignupRequest: userData => dispatch(userSignupRequest(userData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
