import { connect } from "react-redux";
import NavBar from "./NavBar";
import { logout } from "../../actions/authActions";

const mapStateToProps = state => {
  //   debugger;
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      return dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
