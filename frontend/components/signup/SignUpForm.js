import React from "react";
import timezones from "./timezone/timezone";
import map from "lodash/map";
import classnames from "classnames";
// import validateInput from "../../../backend/common/validations/signup";
import TextFieldGroup from "../common/TextFieldGroup";
import OptionFieldGroup from "../common/OptionFieldGroup";

class SignUpForm extends React.Component {
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
      invalid: false
    };
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  autoFill(e) {
    e.preventDefault();
    this.setState({
      username: "edmond",
      email: "edmondxie@gmail.com",
      password: "password",
      passwordConfirm: "password",
      timezone: "Pacific/Honolulu"
    });
  }

  checkUserExists(e) {
    e.preventDefault();
    const field = e.target.name;
    const val = e.target.value;
    if (val !== "") {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = `There is user with such ${field}`;
          invalid = true;
        } else {
          errors[field] = "";
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    // debugger;
    e.preventDefault();
    // if (this.isValid()) {
    this.setState({ errors: {}, isLoading: true });
    this.props.signup(this.state).then(res => {
      setTimeout(() => {
        const { username, password } = this.state;
        this.props
          .login({
            identifier: username,
            password: password,
            errors: {},
            isLoading: false
          })
          .then(res => {
            return this.context.router.push("/");
          });
      }, 100);
    });
    // }
  }

  render() {
    const { errors } = this.state;

    return (
      <form>
        <h1>Please Sign Up!</h1>
        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={e => this.onChange(e)}
          checkUserExists={e => this.checkUserExists(e)}
          value={this.state.username}
          field="username"
        />
        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={e => this.onChange(e)}
          checkUserExists={e => this.checkUserExists(e)}
          value={this.state.email}
          field="email"
        />
        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={e => this.onChange(e)}
          checkUserExists=""
          value={this.state.password}
          field="password"
          type="password"
        />
        <TextFieldGroup
          error={errors.passwordConfirm}
          label="Password Confirm"
          onChange={e => this.onChange(e)}
          checkUserExists=""
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
          error={errors.timezone}
        />

        <div className="form-group">
          <button
            className="btn btn-primary"
            onClick={e => this.onSubmit(e)}
            disabled={this.state.invalid}
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
    );
  }
}

SignUpForm.propTypes = {
  signup: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
};

SignUpForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SignUpForm;
