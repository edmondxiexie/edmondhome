import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import SelectFieldGroup from "../../common/SelectFieldGroup";

import DateFieldGroup from "../../common/DateFieldGroup";
import DateRangeFieldGroup from "../../common/DateRangeFieldGroup";
import validateInput from "../../../../backend/common/validations/book";

import Loader from "../../common/Loader";

import DateRangePicker from "react-bootstrap-daterangepicker";

import StripeCheckout from "react-stripe-checkout";
import Faker from "faker";
import { isEmpty, isEqual } from "lodash";
import ReactTooltip from "react-tooltip";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class DetailHomnePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInDate: moment(new Date()).format("MM/DD/YYYY"),
      checkOutDate: moment(new Date()).format("MM/DD/YYYY"),
      guests: "",
      errors: {},
      host_name: "Edmond Xie",
      host_email: "edmond@gmail.com",
      host_phone: "412-111-1111",
      favorite: null,
      prices: {},
      occupiedDates: [],
      editable: true,
      valid: false,
      showPayment: false,
      home: {},
      isLoading: true
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
    setTimeout(() => this.setState({ isLoading: false }), 1000); // simulates an async action, and hides the spinner
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.state.favorite, nextProps.favorite)) {
      this.setState({ favorite: nextProps.favorite });
    }

    if (!isEqual(this.state.home, nextProps.home)) {
      const home = nextProps.home;
      this.setState({ home });
    }

    if (!isEqual(this.state.trips, nextProps.trips)) {
      const trips = nextProps.trips;

      const occupiedDates = [];

      for (let trip of trips) {
        if (trip.dates) {
          const dates = JSON.parse(trip.dates);
          occupiedDates.push(...dates);
        }
      }

      this.setState({ occupiedDates });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSelectChange(selected, key) {
    if (selected) {
      this.setState({ [key]: selected.value });
    } else {
      this.setState({ [key]: "" });
    }
  }

  checkSelectRequired(e, name) {
    e.preventDefault();

    const field = name;

    const val = this.state[field];
    let errors = this.state.errors;
    let valid = this.state.valid;

    if (val === "") {
      errors[field] = "This field is required";
      valid = false;
    } else {
      delete errors[field];
      valid = isEmpty(errors);
    }
    this.setState({ errors, valid });
  }

  addToWishlist(e, home_id) {
    e.stopPropagation();
    const wishData = {
      home_id: home_id,
      keeper_id: this.props.auth.user.id
    };
    this.props.addWishlist(wishData).then(() => {
      const alert = {
        text: "Successfully added to wishlist",
        type: "success"
      };
      this.props.addAlert(alert);
      this.props.getFavorite(this.props.auth.user.id, this.props.params.id);
    });
  }

  deleteFromWishlist(e, id) {
    e.stopPropagation();
    this.props.deleteWishlist(id).then(() => {
      const alert = {
        text: "Successfully removed from wishlist",
        type: "success"
      };
      this.props.addAlert(alert);
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

  calculatePrices(checkInDate, checkOutDate) {
    const nights = moment(checkOutDate).diff(moment(checkInDate), "days");
    const base = Number(this.props.home.price) * nights;
    const serviceFee = Number(this.props.home.service_fee);
    const tax = Number(((base + serviceFee) * 0.09).toFixed(2));
    const total = Number((base + tax + serviceFee).toFixed(2));

    const prices = {
      base,
      serviceFee,
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
          <div>Service Fee</div>
          <div>{`$${prices.serviceFee}`}</div>
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

    const { occupiedDates } = this.state;
    let valid = true;

    let checkInDate = moment(new Date())
      .add(1, "days")
      .format("MM/DD/YYYY");
    let checkOutDate = moment(new Date())
      .add(1, "days")
      .format("MM/DD/YYYY");

    while (true) {
      let curDate = moment(checkInDate).format("MM/DD/YYYY");

      while (occupiedDates.includes(curDate)) {
        curDate = moment(curDate)
          .add(1, "days")
          .format("MM/DD/YYYY");
      }

      checkInDate = curDate;

      valid = true;

      for (let i = 0; i < 3; i++) {
        curDate = moment(curDate)
          .add(1, "days")
          .format("MM/DD/YYYY");

        if (
          occupiedDates.includes(
            moment(curDate)
              .add(-1, "days")
              .format("MM/DD/YYYY")
          )
        ) {
          valid = false;
        }

        if (!valid) {
          break;
        }
      }

      if (valid) {
        checkOutDate = curDate;
        break;
      } else {
        checkInDate = curDate;
      }
    }

    const guestAvailabilityArr = new Array(~~this.props.home.guest_availability)
      .fill()
      .map((v, k) => String(k + 1));

    const prices = this.calculatePrices(checkInDate, checkOutDate);

    this.setState({
      valid,
      checkInDate,
      checkOutDate,
      prices,
      guests: Faker.random.arrayElement(guestAvailabilityArr)
    });
  }

  checkCheckInDate(e) {
    const checkInDate = e.target.value;
    this.checkCheckInDateStr(checkInDate);
  }

  checkCheckInDateStr(checkInDate) {
    const { checkOutDate, occupiedDates, errors } = this.state;
    let valid = this.state.valid;

    if (occupiedDates.includes(checkInDate)) {
      errors.checkInDate = "Chosen date unavailable";
      valid = false;
    } else {
      delete errors.checkInDate;
      valid = isEmpty(errors);
    }

    if (!errors.checkInDate) {
      if (moment(checkInDate).isBefore(moment(new Date()))) {
        errors.checkInDate = "Chosen date unavailable";
        valid = false;
      } else {
        delete errors.checkInDate;
        valid = isEmpty(errors);
      }
    }

    if (!moment(checkOutDate).isAfter(checkInDate)) {
      errors.checkOutDate = "Check out date should be after check in date";
      valid = false;
    } else {
      delete errors.checkOutDate;
      valid = isEmpty(errors);
    }

    this.setState({ errors, valid });
  }

  checkCheckOutDate(e) {
    const checkOutDate = e.target.value;
    this.checkCheckOutDateStr(checkOutDate);
  }

  checkCheckOutDateStr(checkOutDate) {
    const { checkInDate, occupiedDates, errors } = this.state;
    let valid = this.state.valid;

    if (
      occupiedDates.includes(
        moment(checkOutDate)
          .add(-1, "days")
          .format("MM/DD/YYYY")
      )
    ) {
      errors.checkOutDate = "Chosen date unavailable";
      valid = false;
    } else {
      delete errors.checkOutDate;
      valid = isEmpty(errors);
    }

    if (!errors.checkOutDate) {
      if (!moment(checkOutDate).isAfter(checkInDate)) {
        errors.checkOutDate = "Check out date should be after check in date";
        valid = false;
      } else {
        delete errors.checkOutDate;
        valid = isEmpty(errors);
      }
    }

    if (!errors.checkOutDate) {
      let validRange = true;
      let date = moment(checkInDate);
      while (date.isBefore(checkOutDate)) {
        if (occupiedDates.includes(date.format("MM/DD/YYYY"))) {
          errors.checkOutDate = "Chosen dates range unavailable";
          valid = false;
          validRange = false;
        }
        date = date.add(1, "days");
      }
      if (validRange) {
        delete errors.checkOutDate;
        valid = isEmpty(errors);
      }
    }

    this.setState({ errors, valid });
  }

  checkCalendar(date, field) {
    if (field === "checkInDate") {
      if (date.isBefore(moment(new Date()))) {
        return true;
      }

      for (let occupiedDate of this.state.occupiedDates) {
        if (date.isSame(moment(occupiedDate))) {
          return true;
        }
      }
    } else {
      if (date.isBefore(moment(new Date()).add(1, "days"))) {
        return true;
      }

      for (let occupiedDate of this.state.occupiedDates) {
        if (date.isSame(moment(occupiedDate).add(1, "days"))) {
          return true;
        }
      }
    }
    return false;
  }

  onBook(e) {
    const { errors, valid } = validateInput(this.state);

    if (!this.props.auth.isAuthenticated) {
      const alert = {
        text: "You must log in first.",
        type: "danger"
      };
      this.props.addAlert(alert);
      window.scrollTo(0, 0);
      this.context.router.push("/login");
      return;
    }

    if (valid) {
      this.setState({ showPayment: true });
    } else {
      this.setState({ errors, valid });
    }
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
      this.props.fetchTripsCount(this.props.auth.user.id);
      this.context.router.push(`/trips/${res.trip.id}`);
    });
  }

  onDatePick(event, picker, field) {
    const date = moment(picker.startDate).format("MM/DD/YYYY");

    let checkInDate, checkOutDate;

    if (field === "checkInDate") {
      checkInDate = date;
      checkOutDate = this.state.checkOutDate;
      this.checkCheckInDateStr(checkInDate);
    } else if (field === "checkOutDate") {
      checkInDate = this.state.checkInDate;
      checkOutDate = date;
      this.checkCheckOutDateStr(checkOutDate);
    }

    const prices = this.calculatePrices(checkInDate, checkOutDate);

    this.setState({
      [field]: date,
      prices
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
          this.onRedirectToTripDetail();
        });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    const {
      id,
      title,
      description,
      image,
      host_id,
      price,
      service_fee,
      district,
      address,
      property_type,
      room_type,
      setup_for_guest,
      guest_availability,
      rooms_availability,
      beds_availability,
      bath_availability,
      target
    } = this.props.home;

    let host_avatar,
      host_name,
      host_username,
      host_email,
      amenities,
      otherAmenities;

    if (this.props.home.host) {
      const host = this.props.home.host;

      amenities = JSON.parse(this.props.home.amenities);
      otherAmenities = JSON.parse(this.props.home.otherAmenities);

      host_avatar = host.avatar;
      host_name = host.fullname;
      host_username = host.username;
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

    return (
      <div className="container home-detail-page-base">
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
                  <h3>{`Hosted by ${host_name || host_username}`}</h3>
                </div>
              </div>
              <div className="jumbotron description">{description}</div>
            </div>

            <hr />
            <h3>Address</h3>
            <div className="address-text">
              <span>
                <i className="fa fa-map-marker" />
              </span>
              {address}
            </div>

            <h3>Amenities</h3>

            <div className="amenities-info">
              <div className="row">{this.buildAmenities(amenities)}</div>
              {!isEmpty(otherAmenities) && <h4>Specials:</h4>}
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
                  <i className="fa fa-star-half-o" />
                  <span>&nbsp;4.5</span>
                </div>
              </div>
              <hr />

              <div className="input-field-group-base">
                {showPayment && (
                  <div
                    className="input-payment-group"
                    key="input-payment-group"
                  >
                    <TextFieldGroup
                      field="checkInDate"
                      label="Check In"
                      name="checkInDate"
                      value={checkInDate}
                      onChange={e => {}}
                      validator={e => {}}
                      error={errors.checkInDate}
                      disabled
                    />

                    <TextFieldGroup
                      field="checkOutDate"
                      label="Check Out"
                      name="checkOutDate"
                      value={checkOutDate}
                      onChange={e => {}}
                      validator={e => {}}
                      error={errors.checkOutDate}
                      disabled
                    />

                    <SelectFieldGroup
                      label="Guests"
                      name="guests"
                      value={guests}
                      options={guestsOptions}
                      placeholder="Choose Your Beds Availability"
                      onChange={value => this.onSelectChange(value, "guests")}
                      validator={e => this.checkSelectRequired(e, "guests")}
                      error={errors.guests}
                      disabled
                    />
                  </div>
                )}

                {!showPayment && (
                  <div className="input-book-group" key="input-book-group">
                    <DateRangeFieldGroup
                      label="Check In"
                      name="checkInDate"
                      error={errors.checkInDate}
                      date={checkInDate}
                      validator={e => this.checkCheckInDate(e)}
                      isInvalidDate={date => {
                        return this.checkCalendar(date, "checkInDate");
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
                      validator={e => this.checkCheckOutDate(e)}
                      isInvalidDate={date => {
                        return this.checkCalendar(date, "checkOutDate");
                      }}
                      onEvent={(event, picker) => {
                        this.onDatePick(event, picker, "checkOutDate");
                      }}
                    />

                    <SelectFieldGroup
                      label="Guests"
                      name="guests"
                      value={guests}
                      options={guestsOptions}
                      placeholder="Choose Your Beds Availability"
                      onChange={value => this.onSelectChange(value, "guests")}
                      validator={e => this.checkSelectRequired(e, "guests")}
                      error={errors.guests}
                    />
                  </div>
                )}
              </div>

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
                  transitionName="payment-animation"
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                >
                  {showPayment && (
                    <div className="payment-btn-group" key="payment-btn-group">
                      <StripeCheckout
                        name="Edmond Inc."
                        descirption="Coolest home reserve!"
                        panelLabel="Pay"
                        amount={this.state.prices.total * 100}
                        currency="USD"
                        stripeKey="pk_test_A01JTFuyJt2HMw7F2e7N6tj7"
                        email="xiejy36@gmail.com"
                        token={e => this.onSubmitPayment(e)}
                      >
                        <button
                          data-tip="React-tooltip"
                          data-for="checkout-tip"
                          className="btn btn-primary btn-block"
                        >
                          Checkout
                        </button>
                        <ReactTooltip
                          id="checkout-tip"
                          type="dark"
                          effect="solid"
                        >
                          <h4>You can use this card for demo</h4>
                          <ul>
                            <li>Card: 4242 4242 4242 4242</li>
                            <li>MM/YY: 2/22</li>
                            <li>CVC: 222</li>
                          </ul>
                        </ReactTooltip>
                      </StripeCheckout>
                      <button
                        className="btn  btn-default btn-block"
                        onClick={e => {
                          this.onCancelPayment(e);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                  transitionName="book-animation"
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                >
                  {!showPayment && (
                    <div className="book-btn-group" key="book-btn-group">
                      <button
                        className="btn btn-success btn-block"
                        onClick={e => this.onBook(e)}
                        disabled={!valid}
                      >
                        Request to Book
                      </button>
                      <button
                        className="btn btn-warning btn-block"
                        onClick={e => {
                          this.autoFill(e);
                        }}
                        data-tip="React-tooltip"
                        data-for="book-autofill-tip"
                      >
                        Auto Fill
                      </button>
                      <ReactTooltip
                        id="book-autofill-tip"
                        type="dark"
                        effect="solid"
                      >
                        Auto fill data for Demo
                      </ReactTooltip>
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
