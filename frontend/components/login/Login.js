import React from "react";
import LoginForm from "./LoginForm";
import PropTypes from "prop-types";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <LoginForm
            login={this.props.login}
            isUserExists={this.props.isUserExists}
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
};

export default Login;
