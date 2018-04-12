import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import Faker from "faker";
import swal from "sweetalert2";
import classnames from "classnames";

import OptionFieldGroup from "../../common/OptionFieldGroup";
import ImageFieldGroup from "../../common/ImageFieldGroup";
import SelectFieldGroup from "../../common/SelectFieldGroup";

import districtOptions from "../asset/district/district";
import roomTypeOptions from "../asset/roomtype/roomtype";
import propertyTypeOptions from "../asset/propertytype/propertytype";
import guestSetupOptions from "../asset/guestsetup/guestsetup";
import guestAvailAbilityOptions from "../asset/guestavailability/guestavailability";
import bedAvailAbilityOptions from "../asset/bedavailability/bedavailability";
import roomAvailAbilityOptions from "../asset/roomavailability/roomavailability";
import bathAvailAbilityOptions from "../asset/bathavailability/bathavailability";
import amenitiesOptions from "../asset/amenities/amenities";

import isEmpty from "lodash/isEmpty";
import validateInput from "../../../../backend/common/validations/home";

import Select from "react-select";

class NewHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      image: "",
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
      amenities: [],
      otherAmenities: [],

      errors: {},
      isLoading: false,
      valid: true
    };
  }

  componentWillMount() {
    if (!this.props.auth.isAuthenticated) {
      const alert = {
        text: "You must log in first.",
        type: "danger"
      };
      this.props.addAlert(alert);
      this.context.router.push("/login");
    }
  }

  checkSelectReuired(e, name) {
    e.preventDefault();

    console.log("name", name);

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

  checkRequired(e) {
    e.preventDefault();
    const field = e.target.name;
    const val = e.target.value;
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

  onSubmit(e) {
    e.preventDefault();

    const { errors, valid } = validateInput(this.state);

    if (valid) {
      this.props.createHome(this.state).then(res => {
        this.context.router.push(`/homes/${res.data.home.id}`);
      });
    } else {
      this.setState({ errors, valid });
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

  onAmenitiesChange(amenities) {
    this.setState({ amenities });
    console.log(amenities);
  }

  onOtherAmenitiesChange(otherAmenities) {
    this.setState({ otherAmenities });
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
          this.setState({ image: response[0].secure_url });
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
      title: "Silicon Valley Condo for Relaxation or Business",
      description: Faker.lorem.paragraph(),
      image:
        "http://res.cloudinary.com/dqace5qmb/image/upload/v1522018205/5129896990_526a74d91f_o.jpg",
      host_id: this.props.auth.user.id,
      price: "235",
      district: "NEW YORK",
      property_type: "APARTMENT",
      room_type: "ENTIRE PLACE",
      amenities: [
        { value: "kitchen", label: "Kitchen" },
        { value: "wifi", label: "Wifi" },
        { value: "tv", label: "TV" },
        { value: "heating", label: "Heating" },
        { value: "parking", label: "Parking" },
        { value: "air conditioning", label: "Air conditioning" },
        { value: "iron", label: "Iron" },
        { value: "hair dryer", label: "Hair Dryer" },
        { value: "first aid kit", label: "First aid kit" }
      ],
      otherAmenities: [
        { value: "A Lovely Cat", label: "A Lovely Cat" },
        { value: "Outdoor Swimming Pool", label: "Outdoor Swimming Pool" }
      ],
      setup_for_guest: "Set up for guest",
      guest_availability: "4",
      rooms_availability: "2",
      beds_availability: "3",
      bath_availability: "1",
      target: "Travel",
      errors: {},
      isLoading: false,
      valid: true
    });
  }

  render() {
    const {
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
      target,
      amenities,
      otherAmenities,
      errors,
      isLoading,
      valid
    } = this.state;

    console.log("state", this.state);

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
          validator={e => this.checkRequired(e)}
          error={errors.title}
        />
        <TextFieldGroup
          field="description"
          label="Home Description"
          name="description"
          value={description}
          onChange={e => this.onChange(e)}
          validator={e => this.checkRequired(e)}
          error={errors.description}
        />
        <ImageFieldGroup
          label="Image"
          field="image"
          value={image}
          onClick={e => this.onOpenImageWidget(e)}
          error={errors.image}
        />
        <TextFieldGroup
          field="price"
          label="Home Price"
          name="price"
          value={price}
          onChange={e => this.onUpdatePrice(e)}
          validator={e => this.checkRequired(e)}
          error={errors.price}
        />

        <SelectFieldGroup
          label="District"
          name="district"
          value={district}
          options={districtOptions}
          placeholder="Choose Your District"
          onChange={value => this.onSelectChange(value, "district")}
          validator={e => this.checkSelectReuired(e, "district")}
          error={errors.district}
        />

        <SelectFieldGroup
          label="Property Type"
          name="property_type"
          value={property_type}
          options={propertyTypeOptions}
          placeholder="Choose Your Property Type"
          onChange={value => this.onSelectChange(value, "property_type")}
          validator={e => this.checkSelectReuired(e, "property_type")}
          error={errors.property_type}
        />

        <SelectFieldGroup
          label="Room Type"
          name="room_type"
          value={room_type}
          options={roomTypeOptions}
          placeholder="Choose Your Room Type"
          onChange={value => this.onSelectChange(value, "room_type")}
          validator={e => this.checkSelectReuired(e, "room_type")}
          error={errors.room_type}
        />

        <SelectFieldGroup
          label="Amenities"
          value={amenities}
          options={amenitiesOptions}
          placeholder="Select available amenities"
          closeOnSelect={false}
          removeSelected={true}
          disabled={false}
          multi={true}
          onChange={value => this.onAmenitiesChange(value)}
          validator={e => this.checkRequired(e)}
          error={errors.amenities}
        />

        <div
          className={classnames("form-group", {
            "has-error": errors.otherAmenities
          })}
        >
          <label className="control-label">Other Amenities</label>
          <Select.Creatable
            multi={true}
            placeholder="Input other Amenities."
            onChange={value => {
              this.onOtherAmenitiesChange(value);
            }}
            value={otherAmenities}
            noResultsText="Input other amenities which are not on the list."
          />
          {errors.otherAmenities && (
            <span className="help-block">{errors.otherAmenities}</span>
          )}
        </div>

        <SelectFieldGroup
          label="Setup For Guest"
          name="setup_for_guest"
          value={setup_for_guest}
          options={guestSetupOptions}
          placeholder="Choose Your Room Type"
          onChange={value => this.onSelectChange(value, "setup_for_guest")}
          validator={e => this.checkSelectReuired(e, "setup_for_guest")}
          error={errors.setup_for_guest}
        />

        <SelectFieldGroup
          label="Guest Availability"
          name="guest_availability"
          value={guest_availability}
          options={guestAvailAbilityOptions}
          placeholder="Choose Your Guest Availability"
          onChange={value => this.onSelectChange(value, "guest_availability")}
          validator={e => this.checkSelectReuired(e, "guest_availability")}
          error={errors.guest_availability}
        />

        <SelectFieldGroup
          label="Rooms Availability"
          name="rooms_availability"
          value={rooms_availability}
          options={roomAvailAbilityOptions}
          placeholder="Choose Your Rooms Availability"
          onChange={value => this.onSelectChange(value, "rooms_availability")}
          validator={e => this.checkSelectReuired(e, "rooms_availability")}
          error={errors.rooms_availability}
        />

        <SelectFieldGroup
          label="Beds Availability"
          name="beds_availability"
          value={beds_availability}
          options={bedAvailAbilityOptions}
          placeholder="Choose Your Beds Availability"
          onChange={value => this.onSelectChange(value, "beds_availability")}
          validator={e => this.checkSelectReuired(e, "beds_availability")}
          error={errors.beds_availability}
        />

        <SelectFieldGroup
          label="Bath Availability"
          name="bath_availability"
          value={bath_availability}
          options={bedAvailAbilityOptions}
          placeholder="Choose Your Bath Availability"
          onChange={value => this.onSelectChange(value, "bath_availability")}
          validator={e => this.checkSelectReuired(e, "bath_availability")}
          error={errors.bath_availability}
        />

        <TextFieldGroup
          field="target"
          label="Target"
          name="target"
          value={target}
          onChange={e => this.onChange(e)}
          validator={e => this.checkRequired(e)}
          error={errors.target}
        />

        <button
          className="btn btn-primary"
          onClick={e => this.onSubmit(e)}
          disabled={!valid}
        >
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
