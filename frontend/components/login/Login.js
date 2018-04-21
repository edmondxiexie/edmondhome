import React from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import validateInput from "../../../backend/common/validations/login";
import isEmpty from "lodash/isEmpty";

class Login extends React.Component {
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
          const userId = this.props.auth.user.id;
          this.props.fetchHostHomesCount(userId);
          this.props.fetchTripsCount(userId);
          this.props.fetchWishlistCount(userId);
          this.props.fetchUserProfile(userId);
          this.context.router.push("/homes");
        },
        err => {
          this.setState({
            errors: err.response.data.errors,
            isLoading: false
          });
        }
      );
    }
  }

  render() {
    const { errors, valid } = this.state;

    return (
      <div className="login-base">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
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
                  type="button"
                  className="btn btn-link"
                  onClick={() => {
                    this.context.router.push("/signup");
                  }}
                >
                  Create a new account
                </button>
                <button
                  className="btn btn-warning pull-right"
                  onClick={e => this.autoFill(e)}
                >
                  Auto Fill
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
};

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Login;
