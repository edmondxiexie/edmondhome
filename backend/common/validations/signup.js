import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  let errors = {};

  if (Validator.isNull(data.username)) {
    errors.useranme = "This field is required";
  }

  if (Validator.isNull(data.email)) {
    errors.email = "This field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isNull(data.password)) {
    errors.password = "This field is required";
  }

  if (Validator.isNull(data.passwordConfirm)) {
    errors.passwordConfirm = "This field is required";
  }

  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Password must match";
  }

  if (Validator.isNull(data.timezone)) {
    errors.timezone = "This field is required";
  }
  console.log(errors);
  return {
    errors,
    isVavlid: isEmpty(errors)
  };
}
