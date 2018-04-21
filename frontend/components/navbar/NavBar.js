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
      search: "",
      avatar: "",
      defaultAvatar:
        "http://res.cloudinary.com/dqace5qmb/image/upload/v1523871369/default-avatar.png"
    };
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      const userId = this.props.auth.user.id;
      this.props.fetchUserProfile(userId);
      this.props.fetchHostHomesCount(userId);
      this.props.fetchTripsCount(userId);
      this.props.fetchWishlistCount(userId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      if (nextProps.auth.user.username != this.state.username) {
        const userId = nextProps.auth.user.id;
        this.props.fetchUserProfile(userId);
        this.props.fetchHostHomesCount(userId);
        this.props.fetchTripsCount(userId);
        this.props.fetchWishlistCount(userId);
      }

      if (nextProps.hostHomesCount) {
        this.setState({
          hostHomesCount: nextProps.hostHomesCount
        });
      }

      if (nextProps.tripsCount) {
        this.setState({
          tripsCount: nextProps.tripsCount
        });
      }

      if (nextProps.wishlistCount) {
        this.setState({
          wishlistCount: nextProps.wishlistCount
        });
      }

      if (nextProps.search) {
        this.setState({
          search: nextProps.searchStr
        });
      }

      if (nextProps.profile) {
        this.setState({
          avatar: nextProps.profile.avatar || this.state.defaultAvatar,
          username: nextProps.profile.username
        });
      }
    } else {
      this.setState({ username: "" });
    }
  }

  logoutAction(e) {
    e.preventDefault();
    this.props.logout().then(() => {
      this.context.router.push("/");
      window.location.reload();
    });
  }

  onSearchChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const keywordsStr = this.state.search.trim();

    this.props.fetchHomesByKeywords(keywordsStr);
    window.scrollTo(0, 0);
    this.context.router.push("/homes");
  }

  onRedirectToHomes(e) {
    e.preventDefault();
    this.props.fetchHomesPage(1);
    this.context.router.push("/homes");
  }

  render() {
    const {
      username,
      hostHomesCount,
      tripsCount,
      wishlistCount,
      avatar
    } = this.state;

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
          <a
            href="#"
            onClick={e => {
              this.onRedirectToHomes(e);
            }}
          >
            Homes
          </a>
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
            <span className="avatar">
              <img src={avatar} />
            </span>
            <span className="caret" />
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link to="/manage">
                Manage Hosts
                <span className="badge">{hostHomesCount}</span>
              </Link>
            </li>
            <li>
              <Link to="/trips">
                My Trips <span className="badge">{tripsCount}</span>
              </Link>
            </li>
            <li>
              <Link to="/wishlist">
                Wishlist
                <span className="badge">{wishlistCount}</span>
              </Link>
            </li>
            <li role="separator" className="divider" />
            <li>
              <Link to="/profile">
                {username}
                <span className="badge">
                  <i className="fa fa-user" aria-hidden="true" />
                </span>
              </Link>
            </li>
            <li role="separator" className="divider" />
            <li>
              <a href="#" onClick={e => this.logoutAction(e)}>
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
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
            <Link
              to="/"
              className="navbar-brand"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <span>
                <img src="/img/brand_logo.png" alt="brand_logo" />
              </span>
              <span>Edmond Book</span>
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse">
            <form className="navbar-form navbar-left search-bar">
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
                className="btn btn-default search-btn"
                onClick={e => {
                  this.onSearchSubmit(e);
                }}
              >
                Submit
              </button>
            </form>
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

NavBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default NavBar;
