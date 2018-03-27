import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  let errors = {};

  for (let field in data) {
    if (typeof data[field] === "string" && Validator.isNull(data[field])) {
      errors[field] = "This field is required";
    }
  }

  return {
    errors,
    valid: isEmpty(errors)
  };
}
