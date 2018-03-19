import React from "react";
import { Link } from "react-router";
import "./NavBar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    // debugger
  }

  render() {
    const userLink = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/new-home">Host your place</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
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
            {userLink}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
