import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  field,
  value,
  label,
  error,
  type,
  onChange,
  placeholder,
  validator,
  disabled
}) => {
  value = value || "";
  return (
    <div className={classnames("form-group", { "has-error": error })}>
      <label className="control-label">{label}</label>
      <input
        onChange={onChange}
        onBlur={validator}
        value={value}
        type={type}
        name={field}
        className="form-control"
        disabled={disabled}
        placeholder={placeholder}
        onKeyPress={e => {
          if (e.key === "Enter") {
            validator(e);
          }
        }}
      />
      {error && <span className="help-block">{error}</span>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  validator: React.PropTypes.func
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
