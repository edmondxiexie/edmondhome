import React from "react";
import GalleryCard from "../../common/GalleryCard";

class IndexHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchHomes();
    if (this.props.auth.isAuthenticated) {
      this.props.fetchWishlist(this.props.auth.user.id);
    }
  }

  onRedirect(e, id) {
    e.preventDefault();
    this.context.router.push(`/homes/${id}`);
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

  buildGallery(homes, wishlist) {
    let gallery = [];
    for (let home of homes) {
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

      let onWishlist = false;
      let wishId = null;

      for (let wish of wishlist) {
        if (id === wish.home_id) {
          onWishlist = true;
          wishId = wish.id;
          break;
        }
      }
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
            showWishlist={true}
            onWishlist={onWishlist}
            handleClick={(e, id) => {
              this.onRedirect(e, id);
            }}
            addToWishlist={e => this.addToWishlist(e, id)}
            deleteFromWishlist={e => this.deleteFromWishlist(e, wishId)}
          />
        </div>
      );
    }
    return gallery;
  }

  render() {
    let homes = this.props.homes || [];
    const wishlist = this.props.wishlist || [];

    return (
      <div>
        <div className="container row">
          <h1 className="text-center">Index page</h1>
          {this.buildGallery(homes, wishlist)}
        </div>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

IndexHomePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexHomePage;
