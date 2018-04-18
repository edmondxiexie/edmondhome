import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  let errors = {};

  const { checkInDate, checkOutDate, guests, occupiedDates } = data;

  if (!moment(checkOutDate).isAfter(checkInDate)) {
    errors.checkOutDate = "Check out date should be after check in date";
  }

  if (moment(checkInDate).isBefore(moment(new Date()))) {
    errors.checkInDate = "Chosen date unavailable";
  }

  let date = moment(checkInDate);
  while (date.isBefore(checkOutDate)) {
    if (occupiedDates.includes(date.format("MM/DD/YYYY"))) {
      errors.checkOutDate = "Chosen dates range unavailable";
    }
    date = date.add(1, "days");
  }

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
