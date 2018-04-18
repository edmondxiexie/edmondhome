import React from "react";
import NavBarContainer from "./navbar/NavBarContainer";
import AlertContainer from "./alert/AlertContainer";
import Footer from "./footer/Footer";

class Root extends React.Component {
  render() {
    return (
      <div className="root">
        <NavBarContainer />
        <AlertContainer />
        <div className="container root-container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Root;
