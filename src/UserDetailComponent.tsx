import React, { Component } from "react";
import { Link } from "react-router-dom";
import { User } from "./models/User";
import { Card, CardTitle, CardText } from "reactstrap";
import { getUsersById } from "./remote/getUsersById";

interface IUserInfoProps {
	user: User;
}

export default class UserDetail extends Component<IUserInfoProps, any> {
	constructor(props: any) {
		super(props);
		this.state = { fetchedUser: User };
	}
	componentDidMount() {
		let user = getUsersById(0);
		this.setState({ fechedUser: user });
	}
	render() {
		return (
			<Card>
				<CardTitle>
					{this.state.fetchedUser.firstName} {this.state.fetchedUser.lastName}
				</CardTitle>
				<CardText>{`Username: ${this.state.fetchedUser.username}`}</CardText>
				<CardText>{`Role: ${this.state.fetchedUser.role}`}</CardText>
			</Card>
		);
	}
}
