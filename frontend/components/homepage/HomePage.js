import React from "react";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.user.username || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      this.setState({
        username: nextProps.auth.user.username
      });
    } else {
      this.setState({
        username: ""
      });
    }
  }

  render() {
    const slogan = this.state.username || "Edmond Home";
    return (
      <div className="jumbotron">
        <h1>{`Welcome! ${slogan}`}</h1>
      </div>
    );
  }
}

export default HomePage;
