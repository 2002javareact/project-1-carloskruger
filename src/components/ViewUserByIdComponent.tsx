import React, { SyntheticEvent } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { getUsersById } from "../remote/getUsersById";
import { User } from "../models/User";
import { Redirect } from "react-router";
import { Table } from "reactstrap";

interface IViewUserState {
	userId: number;
	errorMessage: string;
	viewedUser: User | undefined;
}

export class ViewUsersByIdComponent extends React.Component<
	any,
	IViewUserState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			userId: 0,
			errorMessage: "",
			viewedUser: undefined
		};
	}

	getUser = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			let user = await getUsersById(this.state.userId);
			console.log("ViewUserById", user);

			// this.props.history.push('/clicker') // if we run this, it takes them to that path
			this.setState({
				viewedUser: user
			});
			//	this.props.history.push("/user-info");
		} catch (e) {
			if (e.status === 404) {
				this.setState({
					errorMessage: e.message
				});
			} else {
				this.setState({
					errorMessage: "Something Went Wrong. Oops!"
				});
			}
		}
	};

	updateUserId = (e: any) => {
		this.setState({
			userId: e.currentTarget.value
		});
	};

	render() {
		return this.state.viewedUser ? (
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>UserId</th>
						<th>UserName</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>{this.state.viewedUser.userId}</td>
						<td>{this.state.viewedUser.username}</td>
						<td>{this.state.viewedUser.firstName}</td>
						<td>{this.state.viewedUser.lastName}</td>
						<td>{this.state.viewedUser.email}</td>
						<td>{this.state.viewedUser.role}</td>
					</tr>
				</tbody>
			</Table>
		) : (
			<>
				{/* a react Fragment, disappears on render */}
				<div>
					<p>Please enter the id to see that user's information</p>
					<Form onSubmit={this.getUser}>
						<FormGroup row>
							<Label for="userId" sm={2}>
								UserId
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateUserId}
									value={this.state.userId}
									type="text"
									name="userId"
									id="userId"
									placeholder="enter an UserId"
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
