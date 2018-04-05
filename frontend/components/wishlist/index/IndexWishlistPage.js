import React, { Component } from "react";
import GalleryCard from "../../common/GalleryCard";

class IndexWishlistPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.fetchWishlist(this.props.auth.user.id);
    }
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
        <h1 className="text-center">Wishlist Page</h1>
        {this.buildGallery(wishlist)}
      </div>
    );
  }
}

IndexWishlistPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexWishlistPage;
