import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import OptionFieldGroup from "../../common/OptionFieldGroup";

import DatePicker from "react-datepicker";
import moment from "moment";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";

class DetailHomnePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check_in_date: moment(),
      check_out_date: moment(),
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
                  <i className="fas fa-users" />
                  &nbsp;{`${guest_availability} guests`}
                </span>
                <span className="rooms-availability">
                  <i className="fas fa-cube" />
                  &nbsp;{`${rooms_availability} bedrooms`}
                </span>
                <span className="beds-availability">
                  <i className="fas fa-bed" />
                  &nbsp;{`${beds_availability} beds`}
                </span>
                <span className="bath-availability">
                  <i className="fas fa-bath" />
                  &nbsp;{`${bath_availability} bath`}
                </span>
              </div>
            </div>
            <hr />
            <div className="host-info">
              <div className="avatar pull-left">
                <img src={host_avatar} />
              </div>
              <div className="contact">
                <h3>{`Hosted by ${host_name}`}</h3>
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
          <div className="book-panel col-md-4 col-sm-12">
            <div className="price-base">
              <div className="price-label">
                <i className="fas fa-dollar-sign" />
                {price}&nbsp;
                <span className="price-per">per night</span>
              </div>
              <div className="rating">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half" />
                <span>4.5</span>
              </div>
            </div>
            <hr />
            <TextFieldGroup
              field="check_in_date"
              label="Check In"
              name="check_in_date"
              value={check_in_date}
              error={errors.check_in_date}
              onChange={e => {
                this.onChange(e);
              }}
            />
            <TextFieldGroup
              field="check_out_date"
              label="Check Out"
              name="check_out_date"
              value={check_out_date}
              error={errors.check_out_date}
              onChange={e => {
                this.onChange(e);
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
          </div>
        </div>
        {/* <h1 className="text-center">Detail page</h1> */}
      </div>
    );
  }
}

DetailHomnePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default DetailHomnePage;
