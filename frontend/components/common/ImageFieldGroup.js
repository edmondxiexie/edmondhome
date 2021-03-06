import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const ImageFieldGroup = ({ value, label, error, width, height, onClick }) => {
  const borderColor = error ? "#a9444a" : "#ccc";

  const widthLimit = width || "100%";
  const heightLimit = height || "200px";

  const imageComponent = value ? (
    <div
      style={{
        padding: "5px",
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "360px"
      }}
    >
      <img
        src={value}
        className="img-rounded"
        style={{
          width: widthLimit,
          maxHeight: heightLimit,
          objectFit: "cover"
        }}
        onClick={onClick}
      />
    </div>
  ) : (
    <div
      style={{
        color: "#ccc",
        border: "2px dashed",
        borderColor: borderColor,
        lineHeight: "150px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "#fff"
      }}
      onClick={onClick}
    >
      <span className="glyphicon glyphicon-upload" />
      &nbsp;Click to upload Image
    </div>
  );

  return (
    <div className={classnames("form-group", { "has-error": error })}>
      <label className="control-label">{label}</label>
      {imageComponent}
      {error && <span className="help-block">{error}</span>}
    </div>
  );
};

ImageFieldGroup.propTypes = {
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
};

export default ImageFieldGroup;
