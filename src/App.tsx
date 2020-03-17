import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { User } from "./models/User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginComponent } from "./components/Login";
import { UserInfoComponent } from "./components/UserInfoComponent";
import { ViewAllUsersComponent } from "./components/ViewAllUsersComponent";
import NavBar from "./components/NavBarComponent";
import { ViewUsersByIdComponent } from "./components/ViewUserByIdComponent";
import { ViewReimByStatus } from "./components/ViewReimByStatus";
import { ViewReimByUser } from "./components/ViewReimByUser";
import { SubmitReimburseComponent } from "./components/SubmitReimburse";
import { UpdateUserComponent } from "./components/UpdateUser";
import { UpdateReimburseComponent } from "./components/UpdateReimbursement";

interface IUser {
	currentUser: User;
}

export class App extends React.Component<any, IUser> {
	constructor(props: any) {
		super(props);
		this.state = {
			currentUser: new User(0, "", "", "", "", "", "")
		};
	}

	setTheUser = (currentUser: User) => {
		console.log("SetTheUser", currentUser);
		const {
			userId,
			username,
			password,
			firstName,
			lastName,
			email,
			role
		} = currentUser;

		this.setState({
			currentUser: currentUser
		});
		console.log("User has been updated");
	};

	render() {
		return (
			<div>
				<h1>Welcome to the Employee Reimbursement System</h1>

				<Router>
					<NavBar />
					<Switch>
						<Route
							path="/reimbystatus"
							exact
							render={props => (
								<ViewReimByStatus
									{...props}
									currentUser={this.state.currentUser}
									key={this.state.currentUser.userId}
								/>
							)}
						/>
						<Route
							path="/login"
							exact
							render={props => (
								<LoginComponent {...props} setUser={this.setTheUser} />
							)}
						/>
						<Route
							path="/user-info"
							render={props => (
								<UserInfoComponent
									{...props}
									currentUser={this.state.currentUser}
								/>
							)}
						/>
						<Route
							path="/users"
							exact
							render={props => (
								<ViewAllUsersComponent
									{...props}
									currentUser={this.state.currentUser}
									key={this.state.currentUser.userId}
								/>
							)}
						/>
						<Route
							path="/usersbyid"
							exact
							render={props => (
								<ViewUsersByIdComponent
									{...props}
									currentUser={this.state.currentUser}
									key={this.state.currentUser.userId}
								/>
							)}
						/>
						<Route
							path="/update-user"
							exact
							render={props => (
								<UpdateUserComponent
									{...props}
									currentUser={this.state.currentUser}
									key={this.state.currentUser.userId}
								/>
							)}
						/>
						<Route
							path="/reimbyid"
							exact
							render={props => (
								<ViewReimByUser
									{...props}
									currentUser={this.state.currentUser}
									key={this.state.currentUser.userId}
								/>
							)}
						/>
						<Route
							path="/submitreimb"
							exact
							render={props => (
								<SubmitReimburseComponent
									{...props}
									currentUser={this.state.currentUser}
									key={this.state.currentUser.userId}
								/>
							)}
						/>
						/>
						<Route
							path="/update-reimb"
							exact
							render={props => (
								<UpdateReimburseComponent
									{...props}
									currentUser={this.state.currentUser}
									key={this.state.currentUser.userId}
								/>
							)}
						/>
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
