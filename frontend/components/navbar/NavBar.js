import React from "react";
import {Link} from "react-router";

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		// debugger
	}

	render() {

		const userLink = (<ul className="nav navbar-nav navbar-right">
			<li>
				<Link to="/new-home">
					Host your place
				</Link>
			</li>
			<li>
				<Link to="/signup">
					Sign Up
				</Link>
			</li>
			<li>
				<Link to="/login">
					Login
				</Link>
			</li>
		</ul>);
		// debugger
		return (<nav className="navbar navbar-default">
			<div className="container-fluid">
				<div className="navbar-header">
					<Link to="/" className="navbar-brand">
						Edmond Home
					</Link>
				</div>
				<div className="collapse navbar-collapse">
					{userLink}
				</div>
			</div>
		</nav>);
	}
}

export default NavBar;
