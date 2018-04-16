import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import OptionFieldGroup from "../../common/OptionFieldGroup";
import DateFieldGroup from "../../common/DateFieldGroup";
import DateRangeFieldGroup from "../../common/DateRangeFieldGroup";
import DateRangePicker from "react-bootstrap-daterangepicker";

import StripeCheckout from "react-stripe-checkout";
import Faker from "faker";
import { isEmpty } from "lodash";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class DetailHomnePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInDate: moment(new Date()).format("MM/DD/YYYY"),
      checkOutDate: moment(new Date()).format("MM/DD/YYYY"),
      guests: "",
      errors: {},
      host_avatar:
        "http://res.cloudinary.com/dqace5qmb/image/upload/v1522312537/avatar.jpg",
      host_name: "Edmond Xie",
      host_email: "edmond@gmail.com",
      host_phone: "412-111-1111",
      favorite: null,
      prices: {},
      occupiedDates: [],
      valid: false,
      showPayment: false,
      home: {}
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.fetchHome(this.props.params.id);
    this.props.fetchTripsFromHome(this.props.params.id);
    if (this.props.auth.isAuthenticated) {
      this.props.getFavorite(this.props.auth.user.id, this.props.params.id);
    }
  }

  componentDidMount() {
    $("#date-time-wrapper input").attr("disabled", "disabled");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.favorite !== null) {
      this.setState({ favorite: nextProps.favorite });
    }

    if (!isEmpty(nextProps.home)) {
      const home = nextProps.home;
      console.log("home", home);
      this.setState({ home });
    }

    // if (!isEmpty(nextProps.favorite)) {
    //   this.setState({ favorite: nextProps.favorite });
    // }

    if (!isEmpty(nextProps.trips)) {
      console.log("trips", nextProps.trips);

      const trips = nextProps.trips;

      const occupiedDates = [];

      for (let trip of trips) {
        if (trip.dates) {
          const dates = JSON.parse(trip.dates);
          console.log("dates", dates);
          occupiedDates.push(...dates);
        }
      }

      console.log("occupiedDates", occupiedDates);
      this.setState({ occupiedDates });
    }
  }

  onRedirectDelete(e) {
    e.preventDefault();
  }

  onRedirectEdit(e) {
    e.preventDefault();
    this.context.router.push(`/homes/${this.props.params.id}/edit`);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onDateChange(e, name) {
    // if (name === "check_out_date") {
    //   const days = moment(e).diff(moment(this.state.check_in_date), "days");
    //   console.log("days", days);
    //   if (days > 0) {
    //     e = this.state.check_in_date;
    //   }
    // }

    console.log("date", e);

    this.setState({
      [name]: e
    });
  }

  addToWishlist(e, home_id) {
    e.stopPropagation();
    const wishData = {
      home_id: home_id,
      keeper_id: this.props.auth.user.id
    };
    this.props.addWishlist(wishData).then(() => {
      this.props.getFavorite(this.props.auth.user.id, this.props.params.id);
    });
  }

  deleteFromWishlist(e, id) {
    e.stopPropagation();
    this.props.deleteWishlist(id).then(() => {
      this.setState({ favorite: null });
    });
  }

  buildDetailComponent() {
    if (!_.isEmpty(this.state.home)) {
      const { id, title, description } = this.state.home;
      return (
        <div>
          <label>{`ID: ${id}`}</label>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      );
    }
    return "";
  }

  buildGuestsOptions(guest_availability) {
    const options = {};
    for (let i = 1; i <= guest_availability; i++) {
      options[i] = `${i}`;
    }
    return options;
  }

  buildFavoriteButton() {
    return this.state.favorite ? (
      <button
        className="favorite-btn"
        onClick={e => {
          this.deleteFromWishlist(e, this.state.favorite.id);
        }}
      >
        <i className="fa fa-heart active" />
        <span>Saved</span>
      </button>
    ) : (
      <button
        className="favorite-btn"
        onClick={e => {
          this.addToWishlist(e, this.props.home.id);
        }}
      >
        <i className="fa fa-heart-o" />
        <span>Save</span>
      </button>
    );
  }

  buildAmenities(amenities) {
    const icons = {
      kitchen: "fa-cutlery",
      wifi: "fa-wifi",
      "hot tub": "fa-bath",
      parking: "fa-product-hunt",
      essentials: "fa-life-ring",
      tv: "fa-television",
      heating: "fa-thermometer-three-quarters",
      "air conditioning": "fa-snowflake-o",
      "hot water": "fa-tint",
      lockbox: "fa-lock",
      "washing machine": "fa-shopping-basket",
      "first aid kit": "fa-medkit",
      "laptop friendly workspace": "fa-laptop",
      iron: "fa-sun-o",
      "hair dryer": "fa-bullhorn",
      other: "fa-thumbs-o-up"
    };

    if (amenities) {
      let gallery = [];
      for (let amenity of amenities) {
        const icon = icons[amenity.value]
          ? icons[amenity.value]
          : icons["other"];

        gallery.push(
          <div key={amenity.value} className="col-md-6 col-sm-6 amenities-item">
            <p>
              <i className={`fa ${icon}`} aria-hidden="true" />
              {amenity.label}
            </p>
          </div>
        );
      }
      return gallery;
    }
  }

  calculatePrices(checkInDate, checkOutDate, price) {
    const nights = moment(checkOutDate).diff(moment(checkInDate), "days");
    const base = Number(this.props.home.price) * nights;
    const cleaningFee = 35;
    const tax = Number(((base + cleaningFee) * 0.09).toFixed(2));
    const total = Number(base + tax + cleaningFee);

    const prices = {
      base,
      cleaningFee,
      tax,
      total
    };

    return prices;
  }

  buildPriceSummaryPanel() {
    const { checkInDate, checkOutDate, prices } = this.state;
    const { price } = this.props.home;

    const nights = moment(checkOutDate).diff(moment(checkInDate), "days");

    return (
      <div className="price-summary" key="price-summary">
        <div className="detail">
          <div>{`$${price} x ${nights} nights`}</div>
          <div>{`$${prices.base}`}</div>
        </div>
        <hr />
        <div className="detail">
          <div>Cleaning Fee</div>
          <div>{`$${prices.cleaningFee}`}</div>
        </div>
        <hr />
        <div className="detail">
          <div>Tax</div>
          <div>{`$${prices.tax}`}</div>
        </div>
        <hr />
        <div className="total">
          <div>Total</div>
          <div>{`$${prices.total}`}</div>
        </div>
      </div>
    );
  }

  autoFill(e) {
    e.preventDefault();
    const checkInTime = new Date();
    checkInTime.setDate(
      checkInTime.getDate() - Math.floor(Math.random() * 3 + 1)
    );
    const checkOutTime = new Date();
    checkOutTime.setDate(
      checkOutTime.getDate() + Math.floor(Math.random() * 3 + 1)
    );
    const guestAvailabilityArr = new Array(~~this.props.home.guest_availability)
      .fill()
      .map((v, k) => String(k + 1));

    const checkInDate = moment(checkInTime).format("MM/DD/YYYY");
    const checkOutDate = moment(checkOutTime).format("MM/DD/YYYY");

    const prices = this.calculatePrices(
      checkInDate,
      checkOutDate,
      Number(this.props.home.price)
    );

    const valid = moment(checkOutDate).diff(moment(checkInDate), "days") > 0;

    // const nights = moment(checkOutDate).diff(moment(checkInDate), "days");

    // const base = Number(this.props.home.price) * nights;
    // const cleaningFee = 35;
    // const total = base + cleaningFee;

    // const prices = {
    //   base,
    //   cleaningFee,
    //   total
    // };

    this.setState({
      valid,
      checkInDate,
      checkOutDate,
      prices,
      guests: Faker.random.arrayElement(guestAvailabilityArr)
    });
  }

  isCheckInDateAvailable(date) {
    for (let occupiedDate of this.state.occupiedDates) {
      if (date.isSame(moment(occupiedDate))) {
        return true;
      }
    }
    return false;
  }

  isCheckOutDateAvailable(date) {
    for (let occupiedDate of this.state.occupiedDates) {
      if (date.isSame(moment(occupiedDate).add(1, "days"))) {
        return true;
      }
    }
    return false;
  }

  onBook(e) {
    this.setState({ showPayment: true });
  }

  onCancelPayment(e) {
    this.setState({ showPayment: false });
  }

  onRedirectToTripDetail() {
    const { checkInDate, checkOutDate, guests, prices } = this.state;
    const guest_id = this.props.auth.user.id;

    const dates = [];

    let date = moment(checkInDate);
    while (date.isBefore(checkOutDate)) {
      dates.push(moment(date).format("MM/DD/YYYY"));
      date = date.add(1, "days");
    }

    const tripData = {
      check_in_time: checkInDate,
      check_out_time: checkOutDate,
      reserved_guests: guests,
      prices,
      dates,
      home_id: this.props.home.id,
      guest_id: guest_id
    };

    this.props.createTrip(tripData).then(res => {
      this.context.router.push(`/trips/${res.trip.id}`);
    });
  }

  onDatePick(event, picker, field) {
    const date = moment(picker.startDate).format("MM/DD/YYYY");

    let checkInDate, checkOutDate;

    if (field === "checkInDate") {
      checkInDate = date;
      checkOutDate = this.state.checkOutDate;
    } else if (field === "checkOutDate") {
      checkInDate = this.state.checkInDate;
      checkOutDate = date;
    }

    // if (field === "checkOutDate") {
    const prices = this.calculatePrices(
      checkInDate,
      checkOutDate,
      Number(this.props.home.price)
    );

    // const nights = moment(date).diff(moment(this.state.checkInDate), "days");
    // const base = Number(this.props.home.price) * nights;
    // const cleaningFee = 35;
    // const total = base + cleaningFee;

    // const prices = {
    //   base,
    //   cleaningFee,
    //   total
    // };

    const valid = moment(checkOutDate).diff(moment(checkInDate), "days") > 0;

    // }

    this.setState({
      [field]: date,
      prices,
      valid
    });
  }

  onSubmitPayment(e) {
    if (this.props.auth.isAuthenticated) {
      const price = this.state.prices.total;
      const id = e.id;
      this.props
        .checkout({
          price,
          id
        })
        .then(res => {
          console.log("res", res);
          this.onRedirectToTripDetail();
        });
    }
  }

  render() {
    const {
      id,
      title,
      description,
      image,
      host_id,
      price,
      district,
      property_type,
      room_type,
      setup_for_guest,
      guest_availability,
      rooms_availability,
      beds_availability,
      bath_availability,
      target
    } = this.props.home;

    let host_avatar, host_name, host_email, amenities, otherAmenities;

    if (this.props.home.host) {
      const host = this.props.home.host;

      amenities = JSON.parse(this.props.home.amenities);
      otherAmenities = JSON.parse(this.props.home.otherAmenities);

      host_avatar = host.avatar;
      host_name = host.fullname;
      host_email = host.email;
    }

    const {
      valid,
      showPayment,
      guests,
      errors,
      checkInDate,
      checkOutDate,
      occupiedDates
    } = this.state;

    const guestsOptions = this.buildGuestsOptions(guest_availability);

    const days = moment(checkOutDate).diff(moment(checkInDate), "days");

    const roomTotal = Number(price) * days;
    const cleaningFee = 35;
    const total = roomTotal + cleaningFee;

    return (
      <div className="home-detail-page-base">
        {this.props.auth.isAuthenticated && this.buildFavoriteButton()}

        <img src={image} className="img-cover" />
        <div className="detail-base row">
          <div className="detail-info col-md-8 col-sm-12">
            <div className="basic-info">
              <p>{property_type}</p>
              <h1>{title}</h1>
              <p>{district}</p>
              <div className="availability">
                <span className="guests-availability">
                  <i className="fa fa-users" />
                  &nbsp;{`${guest_availability} guests`}
                </span>
                <span className="rooms-availability">
                  <i className="fa fa-cube" />
                  &nbsp;{`${rooms_availability} bedrooms`}
                </span>
                <span className="beds-availability">
                  <i className="fa fa-bed" />
                  &nbsp;{`${beds_availability} beds`}
                </span>
                <span className="bath-availability">
                  <i className="fa fa-bath" />
                  &nbsp;{`${bath_availability} bath`}
                </span>
              </div>
            </div>

            <hr />

            <div className="host-info">
              <div>
                <div className="avatar">
                  <img src={host_avatar} />
                </div>
                <div>
                  <h3>{`Hosted by ${host_name}`}</h3>
                </div>
              </div>
              <div className="jumbotron description">{description}</div>
            </div>

            <hr />
            <h3>Amenities</h3>

            <div className="amenities-info">
              <div className="row">{this.buildAmenities(amenities)}</div>
              {otherAmenities && <h4>Specials:</h4>}
              <div className="row">{this.buildAmenities(otherAmenities)}</div>
            </div>
          </div>

          <div className="book-panel-base col-md-4 col-sm-12">
            <div className="book-panel">
              <div className="price-base">
                <div className="price-label">
                  <i className="fa fa-dollar" />
                  {price}&nbsp;
                  <span className="price-per">per night</span>
                </div>
                <div className="rating">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half" />
                  <span>&nbsp;4.5</span>
                </div>
              </div>
              <hr />

              <DateRangeFieldGroup
                label="Check In"
                name="checkInDate"
                error={errors.checkInDate}
                date={checkInDate}
                isInvalidDate={date => {
                  return this.isCheckInDateAvailable(date);
                }}
                onEvent={(event, picker) => {
                  this.onDatePick(event, picker, "checkInDate");
                }}
              />

              <DateRangeFieldGroup
                label="Check Out"
                name="checkOutDate"
                error={errors.checkOutDate}
                date={checkOutDate}
                isInvalidDate={date => {
                  return this.isCheckOutDateAvailable(date);
                }}
                onEvent={(event, picker) => {
                  this.onDatePick(event, picker, "checkOutDate");
                }}
              />

              <OptionFieldGroup
                label="Guests"
                name="guests"
                options={guestsOptions}
                value={guests}
                onChange={e => {
                  this.onChange(e);
                }}
                validator={e => {}}
                error={errors.guests}
              />

              <hr />

              <ReactCSSTransitionGroup
                transitionName="price-animation"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
              >
                {valid && this.buildPriceSummaryPanel()}
              </ReactCSSTransitionGroup>

              <div className="btn-group-base">
                <ReactCSSTransitionGroup
                  transitionName="book-animation"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {showPayment ? (
                    <div className="payment-btn-group" key="payment-btn-group">
                      <StripeCheckout
                        name="EdmondHome Inc."
                        descirption="Coolest home reserve!"
                        panelLabel="Pay"
                        amount={this.state.prices.total * 100}
                        currency="USD"
                        stripeKey="pk_test_A01JTFuyJt2HMw7F2e7N6tj7"
                        email="xiejy36@gmail.com"
                        token={e => this.onSubmitPayment(e)}
                      >
                        <button className="btn btn-primary btn-block">
                          Checkout
                        </button>
                      </StripeCheckout>
                      <button
                        className="btn btn-warning btn-block"
                        onClick={e => {
                          this.onCancelPayment(e);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="book-btn-group" key="book-btn-group">
                      <button
                        className="btn btn-success btn-block"
                        onClick={e => this.onBook(e)}
                      >
                        Request to Book
                      </button>
                      <button
                        className="btn btn-warning btn-block"
                        onClick={e => {
                          this.autoFill(e);
                        }}
                      >
                        Auto Fill
                      </button>
                    </div>
                  )}
                </ReactCSSTransitionGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DetailHomnePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default DetailHomnePage;
