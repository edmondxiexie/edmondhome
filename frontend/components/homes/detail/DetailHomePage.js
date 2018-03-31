import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import OptionFieldGroup from "../../common/OptionFieldGroup";
import DateFieldGroup from "../../common/DateFieldGroup";
import Faker from "faker";
// import DatePicker from "react-datepicker";
// import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";

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
      host_phone: "412-111-1111"
    };
  }

  componentWillMount() {
    this.props.fetchHome(this.props.params.id);
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
    console.log("******", [name]);
    this.setState({
      [name]: e
    });
  }

  buildDetailComponent() {
    // debugger;
    if (!_.isEmpty(this.state.home)) {
      const { id, title, description } = this.state.home;
      //   debugger;
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

  handleDateChange(date) {
    console.log("-----date-----", date);
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

    const {
      check_in_date,
      check_out_date,
      guests,
      errors,
      host_avatar,
      host_name,
      host_email,
      host_phone
    } = this.state;
    const guestsOptions = this.buildGuestsOptions(guest_availability);

    return (
      <div>
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

            <div>
              <button
                className="btn btn-warning"
                onClick={e => this.onRedirectEdit(e)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={e => this.onRedirectDelete(e)}
              >
                Delete
              </button>
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
