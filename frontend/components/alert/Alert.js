import React, { Component } from "react";
import PropTypes from "prop-types";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ alert: this.props.alert });
  }

  render() {
    const { alert } = this.props;

    const active = alert ? "active" : "";

    return (
      <div className="alert-base">
        <div className={`alert alert-danger ${active}`} role="alert">
          {alert}
        </div>
      </div>
    );
  }
}

export default Alert;
