import React from "react";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <LoginForm login={this.props.login} />
        </div>
      </div>
    );
  }
}

export default Login;
