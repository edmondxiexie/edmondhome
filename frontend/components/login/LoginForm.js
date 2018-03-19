import React from "react";
import TextFieldGroup from "../common/TextFieldGroup";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      password: "",
      errors: {},
      isLoading: false
    };
  }

  autoFill(e) {
    e.preventDefault();
    this.setState({
      identifier: "edmond",
      password: "password"
    });
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    debugger;
    e.preventDefault();
  }

  render() {
    return (
      <form>
        <h1>Please Login!</h1>
        <TextFieldGroup
          error=""
          label="Identifier"
          onChange={e => this.onChange(e)}
          checkUserExists=""
          value={this.state.identifier}
          field="identifier"
        />
        <TextFieldGroup
          error=""
          label="Password"
          onChange={e => this.onChange(e)}
          checkUserExists=""
          value={this.state.password}
          field="password"
          type="password"
        />
        <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>
          Login
        </button>
        <button
          className="btn btn-warning pull-right"
          onClick={e => this.autoFill(e)}
        >
          Auto Fill
        </button>
      </form>
    );
  }
}

export default LoginForm;
