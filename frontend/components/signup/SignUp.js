import React from "react";
import PropTypes from "prop-types";
import timezoneOptions from "./timezone/timezone";
import map from "lodash/map";
import classnames from "classnames";
import validateInput from "../../../backend/common/validations/signup";
import TextFieldGroup from "../common/TextFieldGroup";
import OptionFieldGroup from "../common/OptionFieldGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";

import isEmpty from "lodash/isEmpty";
import shortid from "shortid";
import ReactTooltip from "react-tooltip";

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
    const username = `user_${shortid.generate()}`;

    this.setState({
      username,
      email: `${username}@gmail.com`,
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

  onSelectChange(selected, key) {
    if (selected) {
      this.setState({ [key]: selected.value });
    } else {
      this.setState({ [key]: "" });
    }
  }

  checkSelectReuired(e, name) {
    e.preventDefault();

    const field = name;

    const val = this.state[field];
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

  onSubmit(e) {
    e.preventDefault();
    let { errors, valid } = validateInput(this.state);

    const { username, email } = this.state;

    if (!("username" in errors)) {
      this.props.isUserExists(username).then(res => {
        if (res.data.user) {
          errors.username = `There is user with such username`;
          valid = false;
        } else {
          delete errors.username;
          valid = isEmpty(errors);
        }

        if (!("email" in errors)) {
          this.props.isUserExists(email).then(res => {
            if (res.data.user) {
              errors.email = `There is user with such email`;
              valid = false;
            } else {
              delete errors.email;
              valid = isEmpty(errors);
            }

            if (valid) {
              this.setState({ errors: {}, isLoading: true });
              this.props.signup(this.state).then(res => {
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
              });
            } else {
              this.setState({ errors, valid });
            }
          });
        }
      });
    }

    this.setState({ errors, valid });
  }

  render() {
    const {
      errors,
      valid,
      username,
      email,
      password,
      passwordConfirm,
      timezone
    } = this.state;

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
                  value={username}
                  field="username"
                />
                <TextFieldGroup
                  error={errors.email}
                  label="Email"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkUserExists(e)}
                  value={email}
                  field="email"
                />
                <TextFieldGroup
                  error={errors.password}
                  label="Password"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkRequired(e)}
                  value={password}
                  field="password"
                  type="password"
                />
                <TextFieldGroup
                  error={errors.passwordConfirm}
                  label="Password Confirm"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkRequired(e)}
                  value={passwordConfirm}
                  field="passwordConfirm"
                  type="password"
                />

                <SelectFieldGroup
                  label="Timezone"
                  name="timezone"
                  value={timezone}
                  options={timezoneOptions}
                  placeholder="Choose Your Time Zone"
                  onChange={value => this.onSelectChange(value, "timezone")}
                  validator={e => this.checkSelectReuired(e, "timezone")}
                  error={errors.timezone}
                />
                <div className="signin-link">
                  Already have an account?
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => {
                      this.context.router.push("/login");
                    }}
                  >
                    Sign in
                  </button>
                </div>
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
                  data-tip="React-tooltip"
                  data-for="signup-page-autofill-tip"
                >
                  Auto Fill
                </button>
                <ReactTooltip
                  id="signup-page-autofill-tip"
                  type="dark"
                  effect="solid"
                >
                  Auto fill data for Demo
                </ReactTooltip>
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
