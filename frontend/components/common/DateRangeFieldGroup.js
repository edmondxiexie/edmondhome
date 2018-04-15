import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Button } from "react-bootstrap";

const DateRangeFieldGroup = ({
  date,
  isInvalidDate,
  error,
  label,
  onEvent
}) => {
  return (
    <div className={classnames("form-group", { "has-error": error })}>
      <label className="control-label">{label}</label>

      <DateRangePicker
        startDate={moment(date)}
        isInvalidDate={date => {
          return isInvalidDate(date);
        }}
        opens="left"
        onEvent={(event, picker) => onEvent(event, picker)}
        singleDatePicker
        showDropdowns
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={date}
            onChange={() => {}}
          />
          <span className="input-group-btn">
            <Button className="default date-range-toggle">
              <i className="fa fa-calendar" />
            </Button>
          </span>
        </div>
      </DateRangePicker>
    </div>
  );
};

DateRangeFieldGroup.propTypes = {
  date: React.PropTypes.string.isRequired,
  isInvalidDate: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired
};

export default DateRangeFieldGroup;
