import React from "react";
import TextFieldGroup from "../common/TextFieldGroup";

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			password: "",
			passwordConfirm: "",
			timezone: "",
			errors: {},
			isLoading: false,
			invalid: false
		}
	}

	autoFill(e) {
		e.preventDefault();
		this.setState({
			username: "edmond",
			email: "edmondxie@gmail.com",
			password: "password",
			passwordConfirm: "password"
		})
	}

	onChange(e){
		e.preventDefault();
		this.setState({[e.target.name] : e.target.value});
	}

	onSubmit(e) {
		debugger
		e.preventDefault();

	}



	render() {
		return (<form>
			<h1>Please Sign Up!</h1>
			<TextFieldGroup error="" label="Username" onChange={e => this.onChange(e)} checkUserExists="" value={this.state.username} field="username"/>
			<TextFieldGroup error="" label="Email" onChange={e => this.onChange(e)} checkUserExists="" value={this.state.email} field="email"/>
			<TextFieldGroup error="" label="Password" onChange={e => this.onChange(e)} checkUserExists="" value={this.state.password} field="password" type="password"/>
			<TextFieldGroup error="" label="Password Confirm" onChange={e => this.onChange(e)} checkUserExists="" value={this.state.passwordConfirm} field="passwordConfirm" type="password"/>
			<button className="btn btn-primary" onClick={e => this.onSubmit(e)}>Sign Up</button>
			<button className="btn btn-warning pull-right" onClick={e => this.autoFill(e)}>Auto Fill</button>
		</form>)
	}
}

export default SignUpForm;
