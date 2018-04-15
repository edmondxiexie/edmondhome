import { connect } from "react-redux";
import Profile from "./Profile";
import * as profileActions from "../../actions/profileActions";
import * as alertActions from "../../actions/alertActions";

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile.profile || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserProfile: id => {
      return dispatch(profileActions.fetchUserProfile(id));
    },
    patchUserProfile: (id, userData, dataType) => {
      return dispatch(profileActions.patchUserProfile(id, userData, dataType));
    },
    addAlert: alert => {
      return dispatch(alertActions.addAlert(alert));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
