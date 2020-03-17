import React from "react";
import { User } from "../models/User";
import { CardDeck } from "./CardDeckComponent";
import { UserInfoComponent } from "./UserInfoComponent";
import { Redirect } from "react-router";
import { remoteGetAllUsers } from "../remote/getAllUsers";
import { Table } from "reactstrap";

interface IViewAllUsersProps {
	currentUser: User;
}

interface IViewAllUsers {
	allUsers: User[];
	errorMessage: string;
}

export class ViewAllUsersComponent extends React.Component<
	IViewAllUsersProps,
	IViewAllUsers
> {
	constructor(props: any) {
		super(props);
		this.state = {
			allUsers: [],
			errorMessage: ""
		};
	}

	myLocalGetAllUsers = async () => {
		try {
			let users = await remoteGetAllUsers();
			console.log(users);
			this.setState({
				allUsers: users
			});
		} catch (e) {
			if (e.status === 404) {
				this.setState({
					errorMessage: e.message
				});
			}
		}
	};

	// runs when component starts to exist
	componentDidMount() {
		console.log("this.state.currentUser: ", this.props.currentUser);
		if (this.state.allUsers.length !== 0) {
			return;
			//make sure they are admin
		} else if (
			this.props.currentUser.role === "admin" ||
			this.props.currentUser.role === "finance-manager"
		) {
			console.log("call myLocalGetAllUsers?");
			this.myLocalGetAllUsers();
		} else {
			//they weren't admin so do nothing
			console.log("myLocalGetAllUsers did not get call");
			return;
		}
	}

	render() {
		//turn array of users into display components
		let userDisplay = this.state.allUsers.map((ele: User) => {
			return <UserInfoComponent currentUser={ele} key={ele.userId} />;
		});

		return this.props.currentUser.role === "admin" ||
			this.props.currentUser.role === "finance-manager" ? (
			<CardDeck elementsPerRow={4}>{userDisplay}</CardDeck>
		) : (
			<Redirect to="/" />
		);
	}
}
