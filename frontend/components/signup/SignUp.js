import React from "react";
import SignUpForm from "./SignUpForm";
import PropTypes from "prop-types";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <SignUpForm
            signup={this.props.signup}
            isUserExists={this.props.isUserExists}
            login={this.props.login}
          />
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
};

export default SignUp;
