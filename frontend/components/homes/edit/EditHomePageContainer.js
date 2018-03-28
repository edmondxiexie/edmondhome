import { connect } from "react-redux";
import * as homeActions from "../../../actions/homeActions";
import EditHomePage from "./EditHomePage";

const mapStateToProps = state => {
  return {
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditHomePage);
