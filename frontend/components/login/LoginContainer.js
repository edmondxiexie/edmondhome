import { connect } from "react-redux";
import Login from "./Login";
import { login } from "../../actions/authActions";
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    login: userData => {
      return dispatch(login(userData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
