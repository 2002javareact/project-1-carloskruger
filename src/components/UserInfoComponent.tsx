import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import { User } from "../models/User";
import { Redirect } from "react-router";
import { Table } from "reactstrap";

interface IUserInfoProps {
	currentUser: User;
}

export class UserInfoComponent extends React.Component<IUserInfoProps, any> {
	render() {
		return this.props.currentUser.userId ? (
			// <Card>
			// 	<CardTitle>
			// 		{this.props.currentUser.firstName} {this.props.currentUser.lastName}
			// 	</CardTitle>
			// 	<CardText>{`Username: ${this.props.currentUser.username}`}</CardText>
			// 	<CardText>{`Role: ${this.props.currentUser.role}`}</CardText>
			// </Card>
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>UserId</th>
						<th>Username</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>email</th>
						<th>role</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row"></th>
						<td>{this.props.currentUser.userId}</td>
						<td>{this.props.currentUser.username}</td>
						<td>{this.props.currentUser.firstName}</td>
						<td>{this.props.currentUser.lastName}</td>
						<td>{this.props.currentUser.email}</td>
						<td>{this.props.currentUser.role}</td>
					</tr>
				</tbody>
			</Table>
		) : (
			<Redirect to="/login" />
		);
	}
}
