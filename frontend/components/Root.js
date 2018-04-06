import React from "react";
import NavBarContainer from "./navbar/NavBarContainer";
import AlertContainer from "./alert/AlertContainer";

class Root extends React.Component {
  render() {
    return (
      <div className="root">
        <NavBarContainer />
        <AlertContainer />
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
