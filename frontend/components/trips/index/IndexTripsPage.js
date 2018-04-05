import React, { Component } from "react";
import GalleryCard from "../../common/GalleryCard";

class IndexTripsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.fetchTrips(this.props.auth.user.id);
    }
  }

  onRedirect(e, id) {
    e.preventDefault();
    this.context.router.push(`/homes/${id}`);
  }

  buildGallery(trips) {
    let gallery = [];
    for (let trip of trips) {
      let { home, check_in_time, check_out_time } = trip;
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
          />
        </div>
      );
    }
    return gallery;
  }

  render() {
    const trips = this.props.trips || [];
    return (
      <div className="container row">
        <h1 className="text-center">Trip Page</h1>
        {this.buildGallery(trips)}
      </div>
    );
  }
}

IndexTripsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexTripsPage;
