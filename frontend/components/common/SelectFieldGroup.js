import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Select from "react-select";

const SelectFieldGroup = ({
  label,
  value,
  options,
  placeholder,
  closeOnSelect,
  removeSelected,
  multi,
  disabled,
  onChange,
  error,
  validator
}) => {
  const optionsArr = [];

  for (let key in options) {
    const obj = {};
    obj.value = options[key];
    obj.label = key;
    optionsArr.push(obj);
  }

  return (
    <div
      className={classnames("form-group", {
        "has-error": error
      })}
    >
      <label className="control-label">{label}</label>
      <Select
        value={value}
        options={optionsArr}
        placeholder={placeholder}
        closeOnSelect={closeOnSelect}
        removeSelected={removeSelected}
        disabled={disabled}
        multi={multi}
        onChange={value => {
          onChange(value);
        }}
      />
      {error && <span className="help-block">{error}</span>}
    </div>
  );
};

SelectFieldGroup.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.array.isRequired,
  options: React.PropTypes.object.isRequired,
  placeholder: React.PropTypes.string,
  closeOnSelect: React.PropTypes.bool,
  removeSelected: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  multi: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
  validator: React.PropTypes.func
};

export default SelectFieldGroup;
