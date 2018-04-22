import React, { Component } from "react";
import GalleryCard from "../../common/GalleryCard";
import TripGalleryCard from "../../common/TripGalleryCard";
import Loader from "../../common/Loader";

class IndexTripsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.fetchTrips(this.props.auth.user.id);
    } else {
      const alert = {
        text: "You must log in first.",
        type: "danger"
      };
      this.props.addAlert(alert);
      this.context.router.push("/login");
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1500); // simulates an async action, and hides the spinner
  }

  onRedirect(e, id) {
    e.preventDefault();
    this.context.router.push(`/trips/${id}`);
  }

  buildGallery(trips) {
    let gallery = [];
    for (let trip of trips) {
      let {
        id,
        home,
        check_in_time,
        check_out_time,
        created_at,
        order_id
      } = trip;
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
            order_id={order_id}
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

    const trips = this.props.trips || [];

    return (
      <div className="container">
        <div className="row">
          <h1 className="page-title">Your trips</h1>
          {this.buildGallery(trips)}
        </div>
      </div>
    );
  }
}

IndexTripsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexTripsPage;
