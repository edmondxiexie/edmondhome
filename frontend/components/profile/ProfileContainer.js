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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
