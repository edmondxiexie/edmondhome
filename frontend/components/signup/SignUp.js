import React from "react";
import SignUpForm from "./SignUpForm";
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
          />
        </div>
      </div>
    );
  }
}

export default SignUp;
