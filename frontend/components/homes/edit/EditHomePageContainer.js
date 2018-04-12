import { connect } from "react-redux";
import * as homeActions from "../../../actions/homeActions";
import * as alertActions from "../../../actions/alertActions";

import EditHomePage from "./EditHomePage";

const mapStateToProps = state => {
  return {
    auth: state.auth,
    home: state.homes.home || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    patchHome: (id, homeData) => {
      return dispatch(homeActions.patchHome(id, homeData));
    },
    fetchHome: id => {
      return dispatch(homeActions.fetchHome(id));
    },
    deleteHome: id => {
      return dispatch(homeActions.deleteHome(id));
    },
    addAlert: alert => {
      return dispatch(alertActions.addAlert(alert));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditHomePage);
