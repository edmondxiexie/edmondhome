import React, { Component } from "react";
import PropTypes from "prop-types";
import AlertItem from "./AlertItem";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class AlertList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const alerts = this.props.alert.map(alert => {
      return (
        <AlertItem
          key={alert.id}
          alert={alert}
          deleteAlert={this.props.deleteAlert}
        />
      );
    });

    return (
      <div className="alert-wrapper">
        <ReactCSSTransitionGroup
          transitionName="alert"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {alerts}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default AlertList;
