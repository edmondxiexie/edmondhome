import React from "react";
import NavBarContainer from "./navbar/NavBarContainer";

class Root extends React.Component {
  render() {
    return (
      <div>
        <NavBarContainer />
        <div className="container root-container">{this.props.children}</div>
        <footer className="container footer">
          <hr />
          <div>&nbsp;&nbsp;© 2018 Copyright: Edmond Home</div>
          <br />
          <br />
        </footer>
      </div>
    );
  }
}

export default Root;
