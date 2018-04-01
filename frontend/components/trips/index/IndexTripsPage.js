import React, { Component } from "react";

class IndexTripsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getTrips(this.props.auth.user.id);
    }
  }

  render() {
    const trips = JSON.stringify(this.props.trips);
    console.log("--------trips------", this.props.trips);
    return (
      <div>
        <p>{trips}</p>
      </div>
    );
  }
}

export default IndexTripsPage;
