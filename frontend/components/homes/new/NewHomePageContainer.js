import { connect } from "react-redux";
import * as homeActions from "../../../actions/homeActions";
import NewHomePage from "./NewHomePage";

const mapStateToProps = state => {
  debugger;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    createHome: data => {
      return dispatch(homeActions.createHome(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewHomePage);
