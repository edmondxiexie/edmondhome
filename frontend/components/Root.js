import React from "react";
import NavBarContainer from "./navbar/NavBarContainer";

class Root extends React.Component {
  render() {
    return (
      <div>
        <NavBarContainer />
        <div className="container root-container">{this.props.children}</div>
      </div>
    );
  }
}

export default Root;
