import React, { Component } from "react";
import GalleryCard from "../../common/GalleryCard";
import TripGalleryCard from "../../common/TripGalleryCard";
import isEmpty from "lodash/isEmpty";

class DetailTripsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: {}
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
        console.log("Trip", this.props.trip);
        this.setState({ trip: this.props.trip });
      });
    }
  }

  render() {
    const trip = this.props.trip || {};
    const home = trip.home || {};

    let {
      id,
      check_in_time,
      check_out_time,
      created_at,
      reserved_guests
    } = trip;

    const {
      title,
      description,
      image,
      property_type,
      room_type,
      price,
      district
    } = home;

    return (
      <div className="container row">
        <h1 className="page-title">Trip detail</h1>

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
            handleClick={e => {
              this.onRedirect(e, id);
            }}
          />
        )}

        <div className="detail-trip-page-base">
          <div className="panel panel-default">
            <div className="panel-body">
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
                <label>Guests</label>
                <p>{reserved_guests}</p>
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
