import React from "react";
import NavBarContainer from "./navbar/NavBarContainer"

class Root extends React.Component {
	render(){
		return(
			<div className="container root-container">
				<NavBarContainer/>
				{this.props.children}
			</div>
		);
	}
}

export default Root;
