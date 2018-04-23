import React, { Component } from "react";
import GalleryCard from "../../common/GalleryCard";
import TripGalleryCard from "../../common/TripGalleryCard";
import Loader from "../../common/Loader";

import isEmpty from "lodash/isEmpty";

class DetailTripsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {},
      isLoading: true
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    if (this.props.auth.isAuthenticated) {
      this.props.fetchTrip(this.props.params.tripId).then(res => {
        if (this.props.auth.user.id !== res.trip.guest_id) {
          const alert = {
            text: "Trip not found.",
            type: "danger"
          };
          this.props.addAlert(alert);
          this.context.router.push("/trips");
        }
        this.setState({ trip: this.props.trip });
      });
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000); // simulates an async action, and hides the spinner
  }

  onRedirect(e, id) {
    e.preventDefault();
    this.context.router.push(`/homes/${id}`);
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    const trip = this.props.trip || {};
    const home = trip.home || {};

    let {
      id,
      check_in_time,
      check_out_time,
      created_at,
      reserved_guests,
      order_id
    } = trip;

    const {
      title,
      description,
      image,
      property_type,
      room_type,
      price,
      district,
      address
    } = home;

    return (
      <div className="container">
        <div className="row">
          <h1 className="page-title">Trip detail</h1>

          <div className="detail-trip-page-base">
            <div className="panel panel-default">
              <div className="panel-body">
                {!isEmpty(home) && (
                  <TripGalleryCard
                    id={id}
                    title={title}
                    image={image}
                    checkInDate={check_in_time}
                    checkOutDate={check_out_time}
                    orderDate={created_at}
                    district={district}
                    price={price}
                    handleClick={e => {}}
                    order_id={order_id}
                  />
                )}
                <div>
                  <label>Trip No.</label>
                  <p>{id}</p>
                </div>
                <div>
                  <label>Check In Date</label>
                  <p>{moment(check_in_time).format("MMM DD YYYY")}</p>
                </div>
                <div>
                  <label>Check Out Date</label>
                  <p>{moment(check_out_time).format("MMM DD YYYY")}</p>
                </div>
                <div>
                  <label>Total</label>
                  <p>$334</p>
                </div>
                <div>
                  <label>Order Placed</label>
                  <p>{moment(created_at).format("MMM DD YYYY h:mm A")}</p>
                </div>
                <div>
                  <label>Address</label>
                  <p>{address}</p>
                </div>
                <div>
                  <label>Guests</label>
                  <p>{reserved_guests}</p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={e => {
                    this.onRedirect(e, home.id);
                  }}
                >
                  Home Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DetailTripsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default DetailTripsPage;
