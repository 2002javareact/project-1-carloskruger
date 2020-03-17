import React, { SyntheticEvent } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { login } from "../remote/login";
import { User } from "../models/User";
import { Redirect } from "react-router";

interface ILoginState {
	username: string;
	userId: number;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	errorMessage: string;
	user: User | undefined;
	role: string;
}

export class LoginComponent extends React.Component<any, ILoginState> {
	constructor(props: any) {
		super(props);
		this.state = {
			username: "",
			userId: 0,
			password: "",
			firstName: "",
			lastName: "",
			email: "",
			errorMessage: "",
			user: undefined,
			role: ""
		};
	}

	submitLogin = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			let user = await login(this.state.username, this.state.password);
			// this.props.history.push('/clicker') // if we run this, it takes them to that path
			this.setState({
				user: user
			});
			this.props.setUser(user);
			this.props.history.push("/user-info");
		} catch (e) {
			if (e.status === 404) {
				this.setState({
					password: "",
					errorMessage: e.message
				});
			} else {
				this.setState({
					password: "",
					errorMessage: "Something Went Wrong. Oops!"
				});
			}
		}
	};

	updateUser = (e: any) => {
		this.setState({
			username: e.currentTarget.value
		});
	};
	updatePassword = (e: any) => {
		this.setState({
			password: e.currentTarget.value
		});
	};

	render() {
		// return this.state.user ? (
		// 	// 	<Redirect to="/" />

		// 	<Redirect to="/user-info" />
		// ) : (
		// 	// <div>
		// 	// 	<p>You are logged in now as: {this.state.username}</p>
		// 	// 	<p> Your role is: {this.state.role} </p>
		// 	// </div>
		return (
			<>
				{/* a react Fragment, disappears on render */}
				<div>
					<h2>Please login</h2>
					<Form onSubmit={this.submitLogin}>
						<FormGroup row>
							<Label for="username" sm={2}>
								Username
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateUser}
									value={this.state.username}
									type="text"
									name="username"
									id="username"
									placeholder="your username"
									required
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="password" sm={2}>
								Password
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updatePassword}
									value={this.state.password}
									type="password"
									name="password"
									id="password"
									placeholder="your password"
									required
								/>
							</Col>
						</FormGroup>
						<Button color="info">Submit</Button>
					</Form>
					<p>{this.state.errorMessage}</p>
				</div>
			</>
		);
	}
}
