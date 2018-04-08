import React from "react";
import { Link } from "react-router";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.user.username,
      hostHomesCount: "",
      tripsCount: "",
      wishlistCount: "",
      search: ""
    };
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      const userId = this.props.auth.user.id;
      this.props.fetchHostHomesCount(userId);
      this.props.fetchTripsCount(userId);
      this.props.fetchWishlistCount(userId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      this.setState({
        username: nextProps.auth.user.username,
        hostHomesCount: nextProps.hostHomesCount,
        tripsCount: nextProps.tripsCount,
        wishlistCount: nextProps.wishlistCount
      });
    } else {
      this.setState({ username: "" });
    }
  }

  logoutAction(e) {
    e.preventDefault();
    this.props.logout().then(() => {
      this.context.router.push("/");
    });
  }

  onSearchChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const keywords = this.state.search.trim().split(" ");

    this.props.fetchHomesByKeywords(keywords);
    this.setState({ search: "" });
    console.log("Search", keywords);
  }

  render() {
    const { username, hostHomesCount, tripsCount, wishlistCount } = this.state;
    const { isAuthenticated } = this.props.auth;

    const guestLink = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/homes">Homes</Link>
        </li>
        <li>
          <Link to="/homes/new">Host your place</Link>
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
          <Link to="/homes">Homes</Link>
        </li>
        <li>
          <Link to="/homes/new">Host your place</Link>
        </li>
        <li className="dropdown">
          <a
            href="#"
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {username} <span className="caret" />
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link to="/manage">
                Manage Hosts <span className="badge">{hostHomesCount}</span>
              </Link>
            </li>
            <li>
              <Link to="/trips">
                My Trips <span className="badge pull-right">{tripsCount}</span>
              </Link>
            </li>
            <li>
              <Link to="/wishlist">
                Wishlist
                <span className="badge pull-right">{wishlistCount}</span>
              </Link>
            </li>
            <li role="separator" className="divider" />
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
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
        {/* <div className="container-fluid"> */}
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
            <span>
              <img src="/img/brand_logo.png" alt="brand_logo" />
            </span>
            <span>ShareRoof</span>
          </Link>
        </div>
        <form className="navbar-form navbar-left">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="search"
              value={this.state.search}
              placeholder="Search"
              onChange={e => {
                this.onSearchChange(e);
              }}
            />
          </div>
          <button
            className="btn btn-default"
            onClick={e => {
              this.onSearchSubmit(e);
            }}
          >
            Submit
          </button>
        </form>
        {/* <div className="search">
          <input
            type="text"
            name="search"
            value={this.state.search}
            onChange={e => {
              this.onSearchChange(e);
            }}
            className="search__input"
            placeholder="Search"
          />
          <button
            className="search__button"
            onClick={e => {
              this.onSearchSubmit(e);
            }}
          >
            <i className="fa fa-search search__icon" />
          </button>
        </div> */}

        <div className="collapse navbar-collapse" id="navbar-collapse">
          {isAuthenticated ? userLink : guestLink}
        </div>
        {/* </div> */}
      </nav>
    );
  }
}

NavBar.propTypes = {
  logout: React.PropTypes.func.isRequired
};

NavBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default NavBar;
