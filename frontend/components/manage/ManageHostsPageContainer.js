import { connect } from "react-redux";
import ManageHostsPage from "./ManageHostsPage";
import * as hostActions from "../../actions/hostActions";

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    hostHomes: state.host.hostHomes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHostHomes: hostId => {
      return dispatch(hostActions.fetchHostHomes(hostId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHostsPage);
