import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import OptionFieldGroup from "../../common/OptionFieldGroup";
import DateFieldGroup from "../../common/DateFieldGroup";
import Faker from "faker";

class DetailHomnePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check_in_date: moment(new Date()).format("MMM DD YYYY h:mm A"),
      check_out_date: moment(new Date()).format("MMM DD YYYY h:mm A"),
      guests: "",
      errors: {},
      host_avatar:
        "http://res.cloudinary.com/dqace5qmb/image/upload/v1522312537/avatar.jpg",
      host_name: "Edmond Xie",
      host_email: "edmond@gmail.com",
      host_phone: "412-111-1111",
      favorite: null
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.fetchHome(this.props.params.id);
    if (this.props.auth.isAuthenticated) {
      this.props
        .getFavorite(this.props.auth.user.id, this.props.params.id)
        .then(() => {
          this.setState({ favorite: this.props.favorite });
        });
    }
  }

  componentDidMount() {
    $("#date-time-wrapper input").attr("disabled", "disabled");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.favorite !== null) {
      this.setState({ favorite: nextProps.favorite });
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
    this.setState({
      check_in_date: moment(checkInTime).format("MMM DD YYYY h:mm A"),
      check_out_date: moment(checkOutTime).format("MMM DD YYYY h:mm A"),
      guests: Faker.random.arrayElement(guestAvailabilityArr)
    });
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

    const { check_in_date, check_out_date, guests, errors } = this.state;

    const guestsOptions = this.buildGuestsOptions(guest_availability);

    const days = moment(check_out_date).diff(moment(check_in_date), "days");

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
              <DateFieldGroup
                label="Check In"
                name="check_in_date"
                value={check_in_date}
                error={errors.check_in_date}
                onChange={e => {
                  this.onDateChange(e, "check_in_date");
                }}
              />
              <DateFieldGroup
                label="Check Out"
                name="check_out_date"
                value={check_out_date}
                error={errors.check_out_date}
                onChange={e => {
                  this.onDateChange(e, "check_out_date");
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

              {days > 0 && (
                <div className="price-summary">
                  <div className="formula">
                    <div>{`$${price} x ${days} nights`}</div>
                    <div>{`$${roomTotal}`}</div>
                  </div>
                  <hr />
                  <div className="cleaning">
                    <div>Cleaning Fee</div>
                    <div>{`$${cleaningFee}`}</div>
                  </div>
                  <hr />
                  <div className="total">
                    <div>Total</div>
                    <div>{`$${total}`}</div>
                  </div>
                </div>
              )}

              <button className="btn btn-success btn-block" onClick={e => {}}>
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
