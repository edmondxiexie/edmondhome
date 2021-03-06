import React, { Component } from "react";
import GalleryCard from "../../common/GalleryCard";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Loader from "../../common/Loader";

class IndexWishlistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.fetchWishlist(this.props.auth.user.id);
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000); // simulates an async action, and hides the spinner
  }

  addToWishlist(e, home_id) {
    e.stopPropagation();
    const wishData = {
      home_id: home_id,
      keeper_id: this.props.auth.user.id
    };
    this.props.addWishlist(wishData).then(res => {
      const alert = {
        text: "Successfully added to wishlist",
        type: "success"
      };
      this.props.addAlert(alert);
      this.props.fetchWishlist(this.props.auth.user.id);
    });
  }

  deleteFromWishlist(e, id) {
    e.stopPropagation();
    this.props.deleteWishlist(id).then(res => {
      const alert = {
        text: "Successfully removed from wishlist",
        type: "success"
      };
      this.props.addAlert(alert);
      this.props.fetchWishlist(this.props.auth.user.id);
    });
  }

  onRedirect(e, id) {
    e.preventDefault();
    this.context.router.push(`/homes/${id}`);
  }

  buildGallery(wishlist) {
    let gallery = [];
    for (let wish of wishlist) {
      let { home } = wish;
      let {
        id,
        title,
        description,
        image,
        property_type,
        room_type,
        price,
        district
      } = home;

      gallery.push(
        <div key={id} className="col-md-4 col-sm-6">
          <GalleryCard
            propertyType={property_type}
            roomType={room_type}
            price={price}
            district={district}
            id={id}
            title={title}
            description={description}
            image={image}
            handleClick={(e, id) => {
              this.onRedirect(e, id);
            }}
            showFavButton={true}
            onWishlist={true}
            addToWishlist={e => this.addToWishlist(e, id)}
            deleteFromWishlist={e => this.deleteFromWishlist(e, wish.id)}
          />
        </div>
      );
    }
    return gallery;
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    const wishlist = this.props.wishlist || [];
    return (
      <div className="wishlist-page-base">
        <div className="container">
          <div className="row">
            <h1 className="page-title">Your wishlist</h1>
            <ReactCSSTransitionGroup
              transitionName="slide"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              {this.buildGallery(wishlist)}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

IndexWishlistPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexWishlistPage;
