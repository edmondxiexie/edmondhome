import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";

class NewHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      img: "",
      host_id: "",
      price: "",
      district: "",
      property_type: "",
      room_type: "",
      setup_for_guest: "",
      guest_availability: "",
      rooms_availability: "",
      beds_availability: "",
      bath_availability: "",
      target: "",
      errors: [],
      isLoading: false
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createHome(this.state).then(res => {
      //   debugger;
      this.context.router.push(`/homes/${res.data.home.id}`);
    });
  }

  autoFill(e) {
    e.preventDefault();
    this.setState({
      title: `Title created at: ${new Date().toString()}`,
      description: `Description created at: ${new Date().toString()}`,
      img:
        "http://res.cloudinary.com/dqace5qmb/image/upload/v1522018208/14823475947_bf9035e9dc_o.jpg",
      host_id: "1",
      price: "100",
      district: "Sunnyvale",
      property_type: "Apartment",
      room_type: "Apartment",
      setup_for_guest: "Self",
      guest_availability: "4",
      rooms_availability: "2",
      beds_availability: "3",
      bath_availability: "1",
      target: "Travel"
    });
  }

  render() {
    const {
      title,
      description,
      img,
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
      target,
      errors,
      isLoading
    } = this.state;
    return (
      <form>
        <h1>Host your place</h1>
        <TextFieldGroup
          field="title"
          label="Home Title"
          name="title"
          value={title}
          onChange={e => this.onChange(e)}
          error={errors.title}
        />
        <TextFieldGroup
          field="description"
          label="Home Description"
          name="description"
          value={description}
          onChange={e => this.onChange(e)}
          error={errors.description}
        />
        <TextFieldGroup
          field="img"
          label="Home Image"
          name="img"
          value={img}
          onChange={e => this.onChange(e)}
          error={errors.img}
        />
        <TextFieldGroup
          field="price"
          label="Home Price"
          name="price"
          value={price}
          onChange={e => this.onChange(e)}
          error={errors.price}
        />
        <TextFieldGroup
          field="district"
          label="District"
          name="district"
          value={district}
          onChange={e => this.onChange(e)}
          error={errors.district}
        />
        <TextFieldGroup
          field="property_type"
          label="Property Type"
          name="property_type"
          value={property_type}
          onChange={e => this.onChange(e)}
          error={errors.property_type}
        />
        <TextFieldGroup
          field="room_type"
          label="Room Type"
          name="room_type"
          value={room_type}
          onChange={e => this.onChange(e)}
          error={errors.room_type}
        />
        <TextFieldGroup
          field="setup_for_guest"
          label="Setup For Guest"
          name="setup_for_guest"
          value={setup_for_guest}
          onChange={e => this.onChange(e)}
          error={errors.setup_for_guest}
        />
        <TextFieldGroup
          field="guest_availability"
          label="Guest Availability"
          name="guest_availability"
          value={guest_availability}
          onChange={e => this.onChange(e)}
          error={errors.guest_availability}
        />
        <TextFieldGroup
          field="rooms_availability"
          label="Rooms Availability"
          name="rooms_availability"
          value={rooms_availability}
          onChange={e => this.onChange(e)}
          error={errors.rooms_availability}
        />
        <TextFieldGroup
          field="beds_availability"
          label="Beds Availability"
          name="beds_availability"
          value={beds_availability}
          onChange={e => this.onChange(e)}
          error={errors.beds_availability}
        />
        <TextFieldGroup
          field="bath_availability"
          label="Bath Availability"
          name="bath_availability"
          value={bath_availability}
          onChange={e => this.onChange(e)}
          error={errors.bath_availability}
        />
        <TextFieldGroup
          field="target"
          label="Target"
          name="target"
          value={target}
          onChange={e => this.onChange(e)}
          error={errors.target}
        />

        <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>
          Create
        </button>
        <button
          className="btn btn-warning pull-right"
          onClick={e => this.autoFill(e)}
        >
          Auto Fill
        </button>
      </form>
    );
  }
}

NewHomePage.propTypes = {
  createHome: React.PropTypes.func.isRequired
};

NewHomePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default NewHomePage;
