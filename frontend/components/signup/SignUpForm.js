import React from "react";
import timezones from "./timezone/timezone";
import map from "lodash/map";
import classnames from "classnames";
// import validateInput from "../../../backend/common/validations/signup";
import TextFieldGroup from "../common/TextFieldGroup";

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

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    // debugger;
    e.preventDefault();
    // if (this.isValid()) {
    this.setState({ errors: {}, isLoading: true });
    this.props.userSignupRequest(this.state).then(() => {
      debugger;
    });
    // }
  }

  render() {
    const { errors } = this.state;
    const options = map(timezones, (val, key) => (
      <option key={val} value={val}>
        {key}
      </option>
    ));
    return (
      <form>
        <h1>Please Sign Up!</h1>
        <TextFieldGroup
          error=""
          label="Username"
          onChange={e => this.onChange(e)}
          checkUserExists=""
          value={this.state.username}
          field="username"
        />
        <TextFieldGroup
          error=""
          label="Email"
          onChange={e => this.onChange(e)}
          checkUserExists=""
          value={this.state.email}
          field="email"
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
        <TextFieldGroup
          error=""
          label="Password Confirm"
          onChange={e => this.onChange(e)}
          checkUserExists=""
          value={this.state.passwordConfirm}
          field="passwordConfirm"
          type="password"
        />
        <div
          className={classnames("form-group", { "has-error": errors.timezone })}
        >
          <label className="control-label">Timezone</label>
          <select
            name="timezone"
            className="form-control"
            onChange={e => this.onChange(e)}
            value={this.state.timezone}
          >
            <option value="" disabled>
              Choose Your Timezone
            </option>
            {options}
          </select>
          {errors.timezone && (
            <span className="helper-block">{errors.timezone}</span>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>
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

// SignUpForm.propTypes = {
//   userSignupRequest: React.PropTypes.func.isRequired
// };

// SignUpForm.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };

export default SignUpForm;
