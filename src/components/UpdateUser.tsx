import React, { SyntheticEvent } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { updateUser } from "../remote/updateUser";
import { User } from "../models/User";
import { Redirect } from "react-router";
import { Table } from "reactstrap";

interface IUpdateUserProps {
	currentUser: User;
}

interface IUpdateState {
	username: string;
	userId: number;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	errorMessage: string;
	user: User | undefined;
}

export class UpdateUserComponent extends React.Component<
	IUpdateUserProps,
	IUpdateState
> {
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
			user: undefined
		};
	}

	submitUpdt = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			let user = await updateUser(
				this.state.userId,
				this.state.username,
				this.state.password,
				this.state.firstName,
				this.state.lastName,
				this.state.email
			);
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

	updateUserid = (e: any) => {
		this.setState({
			userId: e.currentTarget.value
		});
	};

	updateUsername = (e: any) => {
		this.setState({
			username: e.currentTarget.value
		});
	};
	updatePassword = (e: any) => {
		this.setState({
			password: e.currentTarget.value
		});
	};

	updateFirstName = (e: any) => {
		this.setState({
			firstName: e.currentTarget.value
		});
	};

	updateLastName = (e: any) => {
		this.setState({
			lastName: e.currentTarget.value
		});
	};

	updateEmail = (e: any) => {
		this.setState({
			email: e.currentTarget.value
		});
	};

	render() {
		return (
			<>
				{/* a react Fragment, disappears on render */}
				<div>
					<h2>Update User</h2>
					<Form onSubmit={this.submitUpdt}>
						<FormGroup row>
							<Label for="userId" sm={2}>
								UserId for user to Update
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateUserid}
									value={this.state.userId}
									type="number"
									name="userId"
									id="userId"
									placeholder="Enter the userId for the user to update"
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="username" sm={2}>
								Username
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateUsername}
									value={this.state.username}
									type="text"
									name="username"
									id="username"
									placeholder="username to update"
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
									placeholder="password to update"
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="firstName" sm={2}>
								First Name
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateFirstName}
									value={this.state.firstName}
									type="text"
									name="firstName"
									id="firstName"
									placeholder="First Name to update"
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="lastName" sm={2}>
								Last Name
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateLastName}
									value={this.state.lastName}
									type="text"
									name="lastName"
									id="lastName"
									placeholder="Last Name to update"
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="email" sm={2}>
								Email
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateEmail}
									value={this.state.email}
									type="text"
									name="email"
									id="email"
									placeholder="email to update"
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
