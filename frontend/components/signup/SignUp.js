import React from "react";
import SignUpForm from "./SignUpForm";
class SignUp extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
					<SignUpForm />
				</div>
			</div>
		);
	}
}

export default SignUp;
