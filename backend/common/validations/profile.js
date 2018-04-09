import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data, type) {
  let errors = {};

  switch (type) {
    case "profile":
      if (Validator.isNull(data.timezone)) {
        errors.timezone = "This field is required";
      }
      if (Validator.isNull(data.password)) {
        errors.password = "This field is required";
      }
      break;
    case "photo":
      if (Validator.isNull(data.avatar)) {
        errors.avatar = "This field is required";
      }
      if (Validator.isNull(data.password)) {
        errors.password = "This field is required";
      }
      break;
    case "password":
      if (Validator.isNull(data.password)) {
        errors.password = "This field is required";
      }

      if (Validator.isNull(data.newPassword)) {
        errors.newPassword = "This field is required";
      }

      if (Validator.isNull(data.newPasswordConfirm)) {
        errors.newPasswordConfirm = "This field is required";
      }

      if (!Validator.equals(data.newPassword, data.newPasswordConfirm)) {
        errors.newPasswordConfirm = "Password must match";
      }
      break;
  }

  return {
    errors,
    valid: isEmpty(errors)
  };
}
