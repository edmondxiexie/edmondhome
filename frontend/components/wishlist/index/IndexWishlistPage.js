import React, { Component } from "react";
import GalleryCard from "../../common/GalleryCard";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class IndexWishlistPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.fetchWishlist(this.props.auth.user.id);
    }
  }

  addToWishlist(e, home_id) {
    e.stopPropagation();
    const wishData = {
      home_id: home_id,
      keeper_id: this.props.auth.user.id
    };
    this.props.addWishlist(wishData).then(res => {
      this.props.fetchWishlist(this.props.auth.user.id);
    });
  }

  deleteFromWishlist(e, id) {
    e.stopPropagation();
    this.props.deleteWishlist(id).then(res => {
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
          <h1>{id}</h1>
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
    const wishlist = this.props.wishlist || [];
    return (
      <div className="container row">
        <h1 className="page-title">Your wishlist</h1>
        <ReactCSSTransitionGroup
          transitionName="alert"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.buildGallery(wishlist)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

IndexWishlistPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexWishlistPage;
