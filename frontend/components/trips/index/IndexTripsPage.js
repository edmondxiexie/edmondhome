import React, { Component } from "react";
import GalleryCard from "../../common/GalleryCard";
import TripGalleryCard from "../../common/TripGalleryCard";

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
    this.context.router.push(`/trips/${id}`);
  }

  buildGallery(trips) {
    let gallery = [];
    for (let trip of trips) {
      let { id, home, check_in_time, check_out_time, created_at } = trip;
      let {
        title,
        description,
        image,
        property_type,
        room_type,
        price,
        district
      } = home;

      gallery.push(
        <div key={id} className="col-md-12 col-sm-12">
          <TripGalleryCard
            id={id}
            title={title}
            image={image}
            checkInDate={check_in_time}
            checkOutDate={check_out_time}
            orderDate={created_at}
            district={district}
            price={price}
            handleClick={e => {
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
        <h1 className="page-title">Your trips</h1>
        {this.buildGallery(trips)}
      </div>
    );
  }
}

IndexTripsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexTripsPage;
