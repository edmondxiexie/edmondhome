import React, { Component } from "react";
import GalleryCard from "../common/GalleryCard";

class ManageHostsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchHostHomes(this.props.user.id);
  }

  onRedirect(e, id) {
    e.preventDefault();
    this.context.router.push(`/homes/${id}`);
  }

  buildGallery(homes) {
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
      // if (title.length > 15) {
      //   title = title.substr(0, 15) + "...";
      // }
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
            showWishlist={false}
          />
        </div>
      );
    }
    return gallery;
  }

  render() {
    let hostHomes = this.props.hostHomes || [];
    return (
      <div className="container row">
        <h1 className="page-title">Manage your homes</h1>
        {this.buildGallery(hostHomes)}
      </div>
    );
  }
}

ManageHostsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ManageHostsPage;
