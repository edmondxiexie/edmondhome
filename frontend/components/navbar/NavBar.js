import React from "react";
import { Link } from "react-router";
import "./NavBar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.user.username
    };
    // debugger
  }
  componentWillReceiveProps(nextProps) {
    // debugger;
    if (nextProps.auth) {
      this.setState({ username: nextProps.auth.user.username });
    } else {
      this.setState({ username: "" });
    }
  }

  logoutAction(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { username } = this.state;
    const { isAuthenticated } = this.props.auth;
    const guestLink = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="#">Host your place</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="#">Host your place</Link>
        </li>
        <li>
          <Link to="#">{username}</Link>
        </li>
        <li>
          <a href="#" onClick={e => this.logoutAction(e)}>
            Logout
          </a>
        </li>
      </ul>
    );
    // debugger
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar-collapse"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">
              Edmond Home
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="navbar-collapse">
            {isAuthenticated ? userLink : guestLink}
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  logout: React.PropTypes.func.isRequired
};

export default NavBar;
