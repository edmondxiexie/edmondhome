import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import DateTimeField from "react-bootstrap-datetimepicker";

const DateFieldGroup = ({ name, value, label, error, onChange, disabled }) => {
  return (
    <div className={classnames("form-group", { "has-error": error })}>
      <label className="control-label">{label}</label>
      <div style={{ position: "relative" }}>
        <DateTimeField
          disabled="true"
          dateTime={value}
          format="MMM DD YYYY h:mm A"
          inputFormat="MMM DD YYYY h:mm A"
          size="md"
          viewMode="date"
          onChange={onChange}
        />
      </div>
      {error && <span className="help-block">{error}</span>}
    </div>
  );
};

DateFieldGroup.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  error: React.PropTypes.string
};

export default DateFieldGroup;
