import { connect } from "react-redux";
import Profile from "./Profile";
import * as profileActions from "../../actions/profileActions";
const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile.profile || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: id => {
      return dispatch(profileActions.getUserProfile(id));
    },
    patchUserProfile: (id, userData) => {
      return dispatch(profileActions.patchUserProfile(id, userData));
    },
    patchUserAvatarProfile: (id, userData) => {
      return dispatch(profileActions.patchUserAvatarProfile(id, userData));
    },
    patchUserPasswordProfile: (id, userData) => {
      return dispatch(profileActions.patchUserPasswordProfile(id, userData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
