import React from "react";
import PropTypes from "prop-types";
import timezoneOptions from "../signup/timezone/timezone";
import map from "lodash/map";
import classnames from "classnames";
import validateInput from "../../../backend/common/validations/profile";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";

import ImageFieldGroup from "../common/ImageFieldGroup";
import Loader from "../common/Loader";

import isEmpty from "lodash/isEmpty";
import ReactTooltip from "react-tooltip";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      timezone: "Pacific/Honolulu",
      password: "",
      newPassword: "",
      newPasswordConfirm: "",
      passwordConfirm: "",
      fullname: "",
      education: "",
      company: "",
      avatar: "",
      errors: {},
      isLoading: true,
      valid: true,
      nav: {
        basic: "active",
        avatar: "",
        password: ""
      }
    };
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.fetchUserProfile(this.props.auth.user.id);
    } else {
      const alert = {
        text: "You must log in first.",
        type: "danger"
      };
      this.props.addAlert(alert);
      this.context.router.push("/login");
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000); // simulates an async action, and hides the spinner
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      const {
        id,
        email,
        username,
        timezone,
        fullname,
        education,
        company,
        phone,
        avatar
      } = nextProps.profile;

      this.setState({
        id,
        email,
        username,
        timezone,
        fullname,
        education,
        company,
        phone,
        avatar: avatar
      });
    }
  }

  onOpenImageWidget(e) {
    e.preventDefault();
    cloudinary.openUploadWidget(
      {
        cloud_name: "dqace5qmb",
        upload_preset: "edmondhome",
        theme: "minimal"
      },
      (errors, response) => {
        if (!errors) {
          this.setState({ avatar: response[0].secure_url });
        }
      }
    );
  }

  autoFillPassword(e) {
    e.preventDefault();
    this.setState({
      password: "password",
      errors: {},
      valid: true
    });
  }

  autoFillNewPassword(e) {
    e.preventDefault();
    this.setState({
      password: "password",
      newPassword: "password",
      newPasswordConfirm: "password",
      errors: {},
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

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeNav(e, nav) {
    e.preventDefault();
    const newNav = {
      basic: "",
      avatar: "",
      password: ""
    };
    newNav[nav] = "active";
    this.setState({ nav: newNav, password: "", valid: true, errors: {} });
  }

  onProfileSave(e, type) {
    e.preventDefault();

    const {
      timezone,
      fullname,
      education,
      company,
      avatar,
      password,
      newPassword,
      newPasswordConfirm
    } = this.state;
    let validateResult, userData;

    switch (type) {
      case "basic":
        userData = {
          timezone,
          fullname,
          password,
          education,
          company
        };
        validateResult = validateInput(this.state, "basic");
        break;
      case "avatar":
        userData = {
          avatar,
          password
        };
        validateResult = validateInput(this.state, "avatar");
        break;
      case "password":
        userData = {
          password,
          newPassword,
          newPasswordConfirm
        };
        validateResult = validateInput(this.state, "password");
        break;
    }

    const { errors, valid } = validateResult;

    if (valid) {
      this.props
        .patchUserProfile(this.props.auth.user.id, userData, type)
        .then(res => {
          const { errors, valid, user } = res;

          const alert = {};

          if (valid) {
            alert.text = "Changes saved successfully.";
            alert.type = "success";
            this.props.addAlert(alert);
            this.setState({ errors: errors, valid: valid, password: "" });
          } else {
            this.setState({ errors: errors, valid: valid, password: "" });
          }
        });
    } else {
      this.setState({ errors, valid });
    }
  }

  buildProfileEditor() {
    const {
      email,
      username,
      timezone,
      password,
      fullname,
      education,
      company,
      errors,
      valid,
      nav
    } = this.state;
    return (
      <div>
        {nav.basic === "active" && (
          <div>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Basic Profile</h3>
              </div>
              <div className="panel-body edit-panel">
                <form>
                  <TextFieldGroup
                    error={errors.username}
                    label="Username"
                    onChange={e => this.onChange(e)}
                    validator={e => this.checkUserExists(e)}
                    value={username}
                    field="username"
                    disabled={true}
                  />
                  <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={e => this.onChange(e)}
                    validator={e => this.checkUserExists(e)}
                    value={email}
                    field="email"
                    disabled={true}
                  />
                  <TextFieldGroup
                    error={errors.fullname}
                    label="Fullname"
                    onChange={e => this.onChange(e)}
                    value={fullname}
                    field="fullname"
                  />
                  <TextFieldGroup
                    error={errors.education}
                    label="Education"
                    onChange={e => this.onChange(e)}
                    value={education}
                    field="education"
                  />
                  <TextFieldGroup
                    error={errors.company}
                    label="Company"
                    onChange={e => this.onChange(e)}
                    value={company}
                    field="company"
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
                </form>
              </div>
            </div>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Enter Password to Save Changes</h3>
              </div>
              <div className="panel-body edit-panel">
                <TextFieldGroup
                  error={errors.password}
                  label="Password"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkRequired(e)}
                  value={password}
                  field="password"
                  type="password"
                />
                <div className="form-group">
                  <button
                    className="btn btn-default pull-left"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary save-btn pull-right"
                    onClick={e => this.onProfileSave(e, "basic")}
                    disabled={!valid}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-warning pull-right"
                    onClick={e => this.autoFillPassword(e)}
                    data-tip="React-tooltip"
                    data-for="profile-password-autofill-tip"
                  >
                    Auto Fill
                  </button>
                  <ReactTooltip
                    id="profile-password-autofill-tip"
                    type="dark"
                    effect="solid"
                  >
                    Auto fill password for Demo
                  </ReactTooltip>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  buildPhotoEditor() {
    const { password, avatar, nav, errors, valid } = this.state;
    return (
      <div>
        {nav.avatar === "active" && (
          <div>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Profile Photo</h3>
              </div>
              <div className="panel-body edit-panel">
                <ImageFieldGroup
                  label="Avatar"
                  field="avatar"
                  value={avatar}
                  width="200px"
                  height="200px"
                  onClick={e => this.onOpenImageWidget(e)}
                  error={errors.avatar}
                />
              </div>
            </div>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Enter Password to Save Changes</h3>
              </div>
              <div className="panel-body edit-panel">
                <TextFieldGroup
                  error={errors.password}
                  label="Password"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkRequired(e)}
                  value={password}
                  field="password"
                  type="password"
                />
                <div className="form-group">
                  <button
                    className="btn btn-default pull-left"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary save-btn pull-right"
                    onClick={e => this.onProfileSave(e, "avatar")}
                    disabled={!valid}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-warning pull-right"
                    onClick={e => this.autoFillPassword(e)}
                    data-tip="React-tooltip"
                    data-for="profile-password-autofill-tip"
                  >
                    Auto Fill
                  </button>
                  <ReactTooltip
                    id="profile-password-autofill-tip"
                    type="dark"
                    effect="solid"
                  >
                    Auto fill password for Demo
                  </ReactTooltip>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  buildPasswordEditor() {
    const {
      password,
      newPassword,
      newPasswordConfirm,
      errors,
      valid,
      nav
    } = this.state;
    return (
      <div>
        {nav.password === "active" && (
          <div>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Password</h3>
              </div>
              <div className="panel-body edit-panel">
                <TextFieldGroup
                  error={errors.password}
                  label="Current Password"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkRequired(e)}
                  value={password}
                  field="password"
                  type="password"
                />
                <TextFieldGroup
                  error={errors.newPassword}
                  label="New Password"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkRequired(e)}
                  value={newPassword}
                  field="newPassword"
                  type="password"
                />
                <TextFieldGroup
                  error={errors.newPasswordConfirm}
                  label="New Password Confirm"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkRequired(e)}
                  value={newPasswordConfirm}
                  field="newPasswordConfirm"
                  type="password"
                />
                <div className="form-group">
                  <button
                    className="btn btn-default pull-left"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary save-btn pull-right"
                    onClick={e => this.onProfileSave(e, "password")}
                    disabled={!valid}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-warning pull-right"
                    onClick={e => this.autoFillNewPassword(e)}
                  >
                    Auto Fill
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    const {
      email,
      username,
      timezone,
      password,
      passwordConfirm,
      fullname,
      education,
      company,
      errors,
      valid,
      nav,
      avatar
    } = this.state;

    return (
      <div className="container">
        <h1 className="page-title">Personal Profile</h1>

        <div className="container row profile-edit-page">
          <div className="col-md-3">
            <div className="avatar">
              <img src={avatar} />
            </div>
            <ul className="nav nav-pills nav-stacked">
              <li className={nav.basic}>
                <a
                  onClick={e => {
                    this.onChangeNav(e, "basic");
                  }}
                >
                  Basic Profile
                </a>
              </li>
              <li className={nav.avatar}>
                <a
                  onClick={e => {
                    this.onChangeNav(e, "avatar");
                  }}
                >
                  Avatar
                </a>
              </li>

              {/* Disable password change temporarily */}
              {/* <li className={nav.password}>
                <a
                  onClick={e => {
                    this.onChangeNav(e, "password");
                  }}
                >
                  Change Password
                </a>
              </li> */}
            </ul>
          </div>

          <div className="col-md-9">
            {this.buildProfileEditor()}
            {this.buildPhotoEditor()}
            {this.buildPasswordEditor()}
          </div>
        </div>
      </div>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Profile;
