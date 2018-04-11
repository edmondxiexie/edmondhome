import { connect } from "react-redux";
import AlertList from "./AlertList";
import * as alertActions from "../../actions/alertActions";

const mapStateToProps = state => {
  return {
    alert: state.alert
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAlert: alert => {
      return dispatch(alertActions.addAlert(alert));
    },
    deleteAlert: id => {
      return dispatch(alertActions.deleteAlert(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertList);
