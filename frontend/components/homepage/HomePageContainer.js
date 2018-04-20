import { connect } from "react-redux";
import HomePage from "./HomePage";
import * as authActions from "../../actions/authActions";
import * as homeActions from "../../actions/homeActions";
import * as profileActions from "../../actions/profileActions";

const mapStateToProps = state => {
  return {
    auth: state.auth,
    galleryHomes: state.homes.galleryHomes || [],
    profile: state.profile.profile || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: userData => {
      return dispatch(authActions.login(userData));
    },
    isUserExists: identifier => {
      return dispatch(authActions.isUserExists(identifier));
    },
    fetchGalleryHomes: count => {
      return dispatch(homeActions.fetchGalleryHomes(count));
    },
    fetchUserProfile: id => {
      return dispatch(profileActions.fetchUserProfile(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
