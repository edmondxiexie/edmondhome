import { connect } from "react-redux";
import Alert from "./Alert";
import * as alertActions from "../../actions/alertActions";

const mapStateToProps = state => {
  return {
    alert: state.alert.alert
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => {
      return dispatch(alertActions.setAlert(alert));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
