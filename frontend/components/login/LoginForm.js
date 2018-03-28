import React from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import validateInput from "../../../backend/common/validations/login";
import isEmpty from "lodash/isEmpty";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      password: "",
      errors: {},
      isLoading: false,
      valid: true
    };
  }

  autoFill(e) {
    e.preventDefault();
    const username = `user_${Math.floor(Math.random() * 50, 1)}`;
    this.setState({
      identifier: username,
      password: "password",
      errors: {},
      isLoading: false,
      valid: true
    });
  }

  checkRequired(e) {
    e.preventDefault();
    const field = e.target.name;
    const val = e.target.value;
    let errors = this.state.errors;
    let valid = this.state.valid;

    if (val === "") {
      errors[field] = "This field is required";
      valid = false;
    } else {
      delete errors[field];
      valid = isEmpty(errors);
    }
    this.setState({ errors, valid });
  }

  checkUserExists(identifier) {
    e.preventDefault();
    let errors = this.state.errors;
    let valid = this.state.valid;

    this.props.isUserExists(identifier).then(res => {
      if (!res.data.user) {
        errors[field] = "There is no user with such username or email";
        valid = false;
      } else {
        errors = {};
        valid = true;
      }
      this.setState({ errors, valid });
    });
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { errors, valid } = validateInput(this.state);
    if (!valid) {
      this.setState({ errors, valid });
    } else {
      this.props.login(this.state).then(
        res => {
          this.context.router.push("/");
        },
        err => {
          this.setState({
            errors: err.response.data.errors,
            isLoading: false
          });
        }
      );
    }

    // debugger;
  }

  render() {
    const { errors, valid } = this.state;

    return (
      <form>
        <h1>Please Login!</h1>
        <TextFieldGroup
          error={errors.identifier}
          label="Identifier"
          onChange={e => this.onChange(e)}
          validator={e => this.checkRequired(e)}
          value={this.state.identifier}
          field="identifier"
        />
        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={e => this.onChange(e)}
          validator={e => this.checkRequired(e)}
          value={this.state.password}
          field="password"
          type="password"
        />
        <button
          className="btn btn-primary"
          onClick={e => this.onSubmit(e)}
          disabled={!valid}
        >
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

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default LoginForm;
