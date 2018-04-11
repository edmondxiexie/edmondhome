import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
class AlertItem extends Component {
  constructor(props) {
    super(props);
  }

  closeAlert(e, id) {
    e.preventDefault();
    this.props.deleteAlert(id);
  }

  render() {
    const { id, type, text } = this.props.alert;
    return (
      <div>
        <br />
        <div
          className={classnames("alert", {
            "alert-success": type === "success",
            "alert-danger": type === "danger",
            "alert-warning": type === "warning"
          })}
        >
          <button onClick={e => this.closeAlert(e, id)} className="close">
            <span>&times;</span>
          </button>
          {text}
        </div>
      </div>
    );
  }
}

export default AlertItem;
