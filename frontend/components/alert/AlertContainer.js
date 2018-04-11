import { connect } from "react-redux";
import AlertList from "./AlertList";
import * as alertActions from "../../actions/alertActions";

const mapStateToProps = state => {
  // if (state.alert.length) {
  //   debugger;
  // }
  return {
    alert: state.alert
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => {
      return dispatch(alertActions.setAlert(alert));
    },
    deleteAlert: id => {
      return dispatch(alertActions.deleteAlert(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertList);
