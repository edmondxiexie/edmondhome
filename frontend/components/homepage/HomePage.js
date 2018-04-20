import React from "react";
import PropTypes from "prop-types";

import { isEmpty } from "lodash";

import TextFieldGroup from "../common/TextFieldGroup";
import validateInput from "../../../backend/common/validations/login";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.user.username || "",
      identifier: "",
      password: "",
      errors: {},
      isLoading: false,
      valid: true
    };
  }

  componentWillMount() {
    this.props.fetchGalleryHomes(14);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      this.setState({
        username: nextProps.auth.user.username
      });
    } else {
      this.setState({
        username: ""
      });
    }
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

  buildGalleryBoard(homes) {
    const gallery = [];

    for (let i = 0; i < 14; i++) {
      const src = homes[i].image;

      gallery.push(
        <div
          className={`gallery__item gallery__item--${i + 1}`}
          key={`Gallery image ${i + 1}`}
        >
          <img
            src={src}
            alt={`Gallery image ${i + 1}`}
            className="gallery__img"
          />
        </div>
      );
    }

    return <div className="gallery">{gallery}</div>;
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
        () => {
          const userId = this.props.auth.user.id;
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
    const { galleryHomes } = this.props;
    const { isAuthenticated } = this.props.auth;
    const { errors, valid } = this.state;

    // const slogan = this.props.profile.fullname || "Edmond Book";
    return (
      <div className="home-page-base">
        <div className="welcome">
          <div className="background-wrapper" />
          <div className="container">
            <div className="row">
              <div
                className={`slogan col-sm-12 ${
                  isAuthenticated ? "col-md-12 isAuthenticated" : "col-md-8"
                }`}
              >
                <h2 className="title">Edmond Book</h2>
                <h1>Don't Go There, Live There</h1>
                <p>A New Way to Lodge and Host.</p>
              </div>

              {!isAuthenticated && (
                <div className="login-panel col-md-4 col-sm-12">
                  <TextFieldGroup
                    error={errors.identifier}
                    label="Username or Email"
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
                    type="button"
                    className="btn btn-signup"
                    onClick={() => {
                      this.context.router.push("/signup");
                    }}
                  >
                    Create a new account
                  </button>
                  <hr />
                  <button
                    className="btn btn-login btn-block"
                    onClick={e => this.onSubmit(e)}
                    disabled={!valid}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-autofill btn-block"
                    onClick={e => this.autoFill(e)}
                  >
                    Auto Fill
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="story">
          <div className="story__pictures">
            <img
              src="https://res.cloudinary.com/dqace5qmb/image/upload/v1524196536/story-1.jpg"
              alt="Travel Couple"
              className="story__img--1"
            />
            <img
              src="https://res.cloudinary.com/dqace5qmb/image/upload/v1524195607/sunset-962156_1280.jpg"
              alt="Beach House"
              className="story__img--2"
            />
          </div>
          <div className="story__content">
            <h3 className="heading-3">Happy Customer</h3>
            <h2 className="heading-2">
              &ldquo;The best travel experience of our lives&rdquo;
            </h2>
            <p className="story__text">
              Asperiores impedit illum sunt consequuntur ipsum repellendus fugit
              ea. Placeat possimus commodi occaecati deleniti ut. Dolore omnis
              quasi ea nam at. Placeat minima temporibus dolorum vel.
            </p>
            <button
              className="btn story-btn"
              onClick={e => {
                window.scrollTo(0, 0);
                this.context.router.push("/homes");
              }}
            >
              Explore
            </button>
          </div>
        </div>

        <div className="introduction container">
          <div className="row">
            <div className="introduction-panel-base col-md-4 col-sm-12">
              <div className="introduction-panel">
                <div className="icon">
                  <i className="fa fa-handshake-o" aria-hidden="true" />
                </div>
                <h3>Easy to Book</h3>
                <p>
                  Asperiores impedit illum sunt consequuntur ipsum repellendus
                  fugit ea. Placeat possimus commodi occaecati deleniti ut.
                  Dolore omnis quasi ea nam at. Placeat minima temporibus
                  dolorum vel.
                </p>
                <div className="btn-wrapper">
                  <button
                    className="btn btn-intro"
                    onClick={e => {
                      window.scrollTo(0, 0);
                      this.context.router.push("/homes");
                    }}
                  >
                    Book Next Home
                  </button>
                </div>
              </div>
            </div>

            <div className="introduction-panel-base col-md-4 col-sm-12">
              <div className="introduction-panel ">
                <div className="icon">
                  <i className="fa fa-map-signs" aria-hidden="true" />
                </div>
                <h3>Easy to Host</h3>
                <p>
                  Asperiores impedit illum sunt consequuntur ipsum repellendus
                  fugit ea. Placeat possimus commodi occaecati deleniti ut.
                  Dolore omnis quasi ea nam at. Placeat minima temporibus
                  dolorum vel.
                </p>
                <div className="btn-wrapper">
                  <button
                    className="btn btn-intro"
                    onClick={e => {
                      window.scrollTo(0, 0);
                      this.context.router.push("/homes/new");
                    }}
                  >
                    Host Your Home
                  </button>
                </div>
              </div>
            </div>

            <div className="introduction-panel-base col-md-4 col-sm-12">
              <div className="introduction-panel">
                <div className="icon">
                  <i className="fa fa-calendar" aria-hidden="true" />
                </div>
                <h3>Easy to Plan</h3>
                <p>
                  Asperiores impedit illum sunt consequuntur ipsum repellendus
                  fugit ea. Placeat possimus commodi occaecati deleniti ut.
                  Dolore omnis quasi ea nam at. Placeat minima temporibus
                  dolorum vel.
                </p>
                <div className="btn-wrapper">
                  <button
                    className="btn btn-intro"
                    onClick={e => {
                      window.scrollTo(0, 0);
                      this.context.router.push("/trips");
                    }}
                  >
                    Plan Next trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isEmpty(galleryHomes) && this.buildGalleryBoard(galleryHomes)}
      </div>
    );
  }
}

HomePage.propTypes = {
  login: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
};

HomePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default HomePage;
