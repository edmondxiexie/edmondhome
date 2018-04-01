import React from "react";
import PropTypes from "prop-types";
import timezones from "../signup/timezone/timezone";
import map from "lodash/map";
import classnames from "classnames";
// import validateInput from "../../../backend/common/validations/signup";
import TextFieldGroup from "../common/TextFieldGroup";
import OptionFieldGroup from "../common/OptionFieldGroup";
import ImageFieldGroup from "../common/ImageFieldGroup";

import isEmpty from "lodash/isEmpty";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      timezone: "Pacific/Honolulu",
      password: "",
      passwordConfirm: "",
      fullname: "",
      education: "",
      company: "",
      errors: {},
      isLoading: false,
      valid: true,
      nav: {
        profile: "active",
        photo: "",
        password: ""
      },
      avatar:
        "http://res.cloudinary.com/dqace5qmb/image/upload/v1522312537/avatar.jpg"
    };
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getUserProfile(this.props.auth.user.id);
    }
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
        password_digest
      } = nextProps.profile;
      this.setState({
        id,
        email,
        username,
        timezone,
        fullname,
        education,
        company
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
          console.log("******Upload Image Successful!!******");
          this.setState({ avatar: response[0].secure_url });
        }
      }
    );
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

  onChangeNav(e, nav) {
    e.preventDefault();
    const newNav = {
      profile: "",
      photo: "",
      password: ""
    };
    newNav[nav] = "active";
    this.setState({ nav: newNav });
  }

  buildPhotoEditor() {
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
      isLoading,
      valid,
      nav,
      avatar
    } = this.state;
    return (
      <div>
        {nav.photo === "active" && (
          <div>
            <div className="panel panel-info">
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
            <div className="panel panel-danger">
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
                    className="btn btn-primary"
                    onClick={e => this.onSubmit(e)}
                    disabled={!valid}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-warning pull-right"
                    onClick={e => {}}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  buildProfileEditor() {
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
      isLoading,
      valid,
      nav,
      avatar
    } = this.state;
    return (
      <div>
        {nav.profile === "active" && (
          <div>
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Basic Info</h3>
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
                  <OptionFieldGroup
                    label="Timezone"
                    name="timezone"
                    value={timezone}
                    options={timezones}
                    onChange={e => this.onChange(e)}
                    validator={e => this.checkRequired(e)}
                    error={errors.timezone}
                  />
                </form>
              </div>
            </div>
            <div className="panel panel-danger">
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
                    className="btn btn-primary"
                    onClick={e => this.onSubmit(e)}
                    disabled={!valid}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-warning pull-right"
                    onClick={e => {}}
                  >
                    Cancel
                  </button>
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
      email,
      username,
      timezone,
      password,
      passwordConfirm,
      fullname,
      education,
      company,
      errors,
      isLoading,
      valid,
      nav,
      avatar
    } = this.state;
    return (
      <div>
        {nav.password === "active" && (
          <div>
            <div className="panel panel-danger">
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
                  error={errors.password}
                  label="New Password"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkRequired(e)}
                  value={password}
                  field="password"
                  type="password"
                />
                <TextFieldGroup
                  error={errors.passwordConfirm}
                  label="New Password Confirm"
                  onChange={e => this.onChange(e)}
                  validator={e => this.checkRequired(e)}
                  value={passwordConfirm}
                  field="passwordConfirm"
                  type="password"
                />
                <div className="form-group">
                  <button
                    className="btn btn-primary"
                    onClick={e => this.onSubmit(e)}
                    disabled={!valid}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-warning pull-right"
                    onClick={e => {}}
                  >
                    Cancel
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
    const profile = JSON.stringify(this.props.profile);
    console.log("profile", profile);

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
      isLoading,
      valid,
      nav,
      avatar
    } = this.state;

    return (
      <div>
        <div className="row profile-edit-page">
          <div className="col-md-3">
            <div className="avatar">
              <img src={avatar} />
            </div>
            <ul className="nav nav-pills nav-stacked">
              <li className={nav.profile}>
                <a
                  onClick={e => {
                    this.onChangeNav(e, "profile");
                  }}
                >
                  Edit Profile
                </a>
              </li>
              <li className={nav.photo}>
                <a
                  onClick={e => {
                    this.onChangeNav(e, "photo");
                  }}
                >
                  Photos
                </a>
              </li>
              <li className={nav.password}>
                <a
                  onClick={e => {
                    this.onChangeNav(e, "password");
                  }}
                >
                  Change Password
                </a>
              </li>
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

export default Profile;
