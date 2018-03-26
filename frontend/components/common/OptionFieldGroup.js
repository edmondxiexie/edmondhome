import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import map from "lodash/map";

const OptionFieldGroup = ({ name, value, label, error, onChange, options }) => {
  const opts = map(options, (val, key) => (
    <option key={val} value={val}>
      {key}
    </option>
  ));

  return (
    <div
      className={classnames("form-group", {
        "has-error": error
      })}
    >
      <label className="control-label">{label}</label>
      <select
        name={name}
        onChange={onChange}
        value={value}
        className="form-control"
      >
        <option value="" disabled>
          Choose Your {label}
        </option>
        {opts}
      </select>
      {error && <span className="help-block">{error}</span>}
    </div>
  );
};

OptionFieldGroup.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

export default OptionFieldGroup;
