import React from "react";
import PropTypes from "prop-types";
import timezones from "./timezone/timezone";
import map from "lodash/map";
import classnames from "classnames";
import validateInput from "../../../backend/common/validations/signup";
import TextFieldGroup from "../common/TextFieldGroup";
import OptionFieldGroup from "../common/OptionFieldGroup";
import isEmpty from "lodash/isEmpty";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      timezone: "",
      errors: {},
      isLoading: false,
      valid: true
    };
  }

  autoFill(e) {
    e.preventDefault();
    this.setState({
      username: "edmond",
      email: "edmondxie@gmail.com",
      password: "password",
      passwordConfirm: "password",
      timezone: "Pacific/Honolulu",
      errors: {},
      valid: true,
      isLoading: false
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

  checkUserExists(e) {
    e.preventDefault();
    this.checkRequired(e);
    const field = e.target.name;
    const val = e.target.value;
    let errors = this.state.errors;
    let valid = this.state.valid;

    if (!(field in errors)) {
      this.props.isUserExists(val).then(res => {
        if (res.data.user) {
          errors[field] = `There is user with such ${field}`;
          valid = false;
        } else {
          delete errors[field];
          valid = isEmpty(errors);
        }
        this.setState({ errors, valid });
      });
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { errors, valid } = validateInput(this.state);

    if (valid) {
      this.setState({ errors: {}, isLoading: true });
      this.props.signup(this.state).then(res => {
        // setTimeout(() => {
        const { username, password } = this.state;
        this.props
          .login({
            identifier: username,
            password: password,
            errors: {},
            isLoading: false
          })
          .then(res => {
            const alert = {
              text: "New account created Successfully.",
              type: "success"
            };
            this.props.addAlert(alert);
            setTimeout(() => {
              return this.context.router.push("/homes");
            }, 1000);
          });
        // }, 500);
      });
    } else {
      this.setState({ errors, valid });
    }
  }

  render() {
    const { errors, valid } = this.state;

    return (
      <div className="signup-base">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <form>
                <h1>Please Sign Up!</h1>
                <TextFieldGroup
                  error={errors.username}
                  label="Username"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkUserExists(e)}
                  value={this.state.username}
                  field="username"
                />
                <TextFieldGroup
                  error={errors.email}
                  label="Email"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkUserExists(e)}
                  value={this.state.email}
                  field="email"
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
                <TextFieldGroup
                  error={errors.passwordConfirm}
                  label="Password Confirm"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkRequired(e)}
                  value={this.state.passwordConfirm}
                  field="passwordConfirm"
                  type="password"
                />
                <OptionFieldGroup
                  label="Timezone"
                  name="timezone"
                  value={this.state.timezone}
                  options={timezones}
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkRequired(e)}
                  error={errors.timezone}
                />

                <div className="form-group">
                  <button
                    className="btn btn-primary"
                    onClick={e => this.onSubmit(e)}
                    disabled={!valid}
                  >
                    Sign Up
                  </button>
                  <button
                    className="btn btn-warning pull-right"
                    onClick={e => this.autoFill(e)}
                  >
                    Auto Fill
                  </button>
                </div>
              </form>
            </div>
          </div>
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

SignUp.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SignUp;
