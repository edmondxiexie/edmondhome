import React, { Component } from "react";
import PropTypes from "prop-types";
import AlertItem from "./AlertItem";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { isEmpty, isEqual } from "lodash";

class AlertList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.state.alerts, nextProps.alert)) {
      this.setState({ alerts: nextProps.alert });
    }
  }

  render() {
    const alerts = this.state.alerts.map(alert => {
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
