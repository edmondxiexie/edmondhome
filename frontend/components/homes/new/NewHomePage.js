import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import Faker from "faker";

import OptionFieldGroup from "../../common/OptionFieldGroup";
import ImageFieldGroup from "../../common/ImageFieldGroup";

import districtOptions from "../asset/district/district";
import roomTypeOptions from "../asset/roomtype/roomtype";
import propertyTypeOptions from "../asset/propertytype/propertytype";
import guestSetupOptions from "../asset/guestsetup/guestsetup";
import guestAvailAbilityOptions from "../asset/guestavailability/guestavailability";
import bedAvailAbilityOptions from "../asset/bedavailability/bedavailability";
import roomAvailAbilityOptions from "../asset/roomavailability/roomavailability";
import bathAvailAbilityOptions from "../asset/bathavailability/bathavailability";

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
      this.context.router.push(`/homes/${res.data.home.id}`);
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onOpenImageWidget(e) {
    e.preventDefault();
    cloudinary.openUploadWidget(
      {
        cloud_name: "dqace5qmb",
        upload_preset: "edmondhome",
        theme: "minimal"
      },
      (errors, response) => {
        if (!errors) {
          console.log("******Upload Image Successful!!******");
          this.setState({ img: response[0].secure_url });
        }
      }
    );
  }

  onUpdatePrice(e) {
    e.preventDefault();
    let price = e.target.value;
    if (!isNaN(price)) {
      if (price.includes(".")) {
        let arr = price.split(".");
        arr[1] = arr[1].substr(0, 2);
        price = arr.join(".");
      }
      this.setState({ price: price });
    }
  }

  autoFill(e) {
    e.preventDefault();
    this.setState({
      title: Faker.name.jobTitle(),
      description: Faker.lorem.sentence(),
      img:
        "https://res.cloudinary.com/dqace5qmb/image/upload/v1522018201/4976907567_99bd3fd7a4_o.jpg",
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
      <div>
        <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>
          Create
        </button>
        <button
          className="btn btn-warning pull-right"
          onClick={e => this.autoFill(e)}
        >
          Auto Fill
        </button>
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
        <ImageFieldGroup
          label="Image"
          value={img}
          onClick={e => this.onOpenImageWidget(e)}
          error={errors.img}
        />
        <TextFieldGroup
          field="price"
          label="Home Price"
          name="price"
          value={price}
          onChange={e => this.onUpdatePrice(e)}
          error={errors.price}
        />
        <OptionFieldGroup
          label="District"
          name="district"
          value={district}
          options={districtOptions}
          onChange={e => this.onChange(e)}
          error={errors.district}
        />
        <OptionFieldGroup
          label="Property Type"
          name="property_type"
          options={propertyTypeOptions}
          value={property_type}
          onChange={e => this.onChange(e)}
          error={errors.property_type}
        />
        <OptionFieldGroup
          label="Room Type"
          name="room_type"
          options={roomTypeOptions}
          value={room_type}
          onChange={e => this.onChange(e)}
          error={errors.room_type}
        />
        <OptionFieldGroup
          label="Setup For Guest"
          name="setup_for_guest"
          options={guestSetupOptions}
          value={setup_for_guest}
          onChange={e => this.onChange(e)}
          error={errors.setup_for_guest}
        />
        <OptionFieldGroup
          label="Guest Availability"
          name="guest_availability"
          options={guestAvailAbilityOptions}
          value={guest_availability}
          onChange={e => this.onChange(e)}
          error={errors.guest_availability}
        />
        <OptionFieldGroup
          label="Rooms Availability"
          name="rooms_availability"
          options={roomAvailAbilityOptions}
          value={rooms_availability}
          onChange={e => this.onChange(e)}
          error={errors.rooms_availability}
        />
        <OptionFieldGroup
          label="Beds Availability"
          name="beds_availability"
          options={bedAvailAbilityOptions}
          value={beds_availability}
          onChange={e => this.onChange(e)}
          error={errors.beds_availability}
        />
        <OptionFieldGroup
          label="Bath Availability"
          name="bath_availability"
          options={bathAvailAbilityOptions}
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
      </div>
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
