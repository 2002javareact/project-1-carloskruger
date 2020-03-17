import React, { SyntheticEvent } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { submitReimbursement } from "../remote/submitreimburse";
import { Reimbursement } from "../models/Reimbursement";
import { User } from "../models/User";
import { Redirect } from "react-router";

interface IViewReimburseProps {
	currentUser: User;
}

interface IReimbursementSubmitState {
	reimbursement: Reimbursement | undefined;
	author: number;
	amount: number;
	dateSubmitted: number;
	dateResolved: number;
	description: string;
	resolver: number;
	status: number;
	type: number;
	errorMessage: string;
}

export class SubmitReimburseComponent extends React.Component<
	any,
	IReimbursementSubmitState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			reimbursement: undefined,
			author: 0,
			amount: 0,
			dateSubmitted: 0,
			dateResolved: 0,
			description: "",
			resolver: 0,
			status: 0,
			type: 0,
			errorMessage: ""
		};
	}

	submitReimburse = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			let reimbursement = await submitReimbursement(
				this.state.author,
				this.state.amount,
				this.state.description,
				this.state.dateSubmitted,
				this.state.dateResolved,
				this.state.resolver,
				this.state.status,
				this.state.type
			);
			// this.props.history.push('/clicker') // if we run this, it takes them to that path
			this.setState({
				reimbursement: reimbursement
			});
		} catch (e) {
			if (e.status === 404) {
				this.setState({
					reimbursement: undefined,
					errorMessage: e.message
				});
			} else {
				this.setState({
					reimbursement: undefined,
					errorMessage: "Something Went Wrong. Oops!"
				});
			}
		}
	};

	updateAuthor = (e: any) => {
		this.setState({
			author: e.currentTarget.value
		});
	};
	updateAmount = (e: any) => {
		this.setState({
			amount: e.currentTarget.value
		});
	};

	updateDateSubmitted = (e: any) => {
		this.setState({
			dateSubmitted: e.currentTarget.value
		});
	};

	updateDateResolved = (e: any) => {
		this.setState({
			dateResolved: e.currentTarget.value
		});
	};

	updateDescription = (e: any) => {
		this.setState({
			description: e.currentTarget.value
		});
	};

	updateResolver = (e: any) => {
		this.setState({
			resolver: e.currentTarget.value
		});
	};

	updateStatus = (e: any) => {
		this.setState({
			status: e.currentTarget.value
		});
	};

	updateType = (e: any) => {
		this.setState({
			type: e.currentTarget.value
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
					<h2>Enter the reimbursement information below:</h2>
					<Form onSubmit={this.submitReimburse}>
						<FormGroup row>
							<Label for="author" sm={2}>
								author
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateAuthor}
									value={this.state.author}
									type="number"
									name="author"
									id="author"
									placeholder="your userId"
									required
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="amount" sm={2}>
								amount
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateAmount}
									value={this.state.amount}
									type="number"
									name="amount"
									id="amount"
									placeholder="reimbursement amount"
									required
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="description" sm={2}>
								description
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateDescription}
									value={this.state.description}
									type="text"
									name="description"
									id="description"
									placeholder="description"
									required
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="dateSubmitted" sm={2}>
								date submitted
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateDateSubmitted}
									value={this.state.dateSubmitted}
									type="number"
									name="dateSubmitted"
									id="dateSubmitted"
									placeholder="dateSubmitted"
									required
								/>
							</Col>
						</FormGroup>

						<FormGroup row>
							<Label for="dateResolved" sm={2}>
								date resolved
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateDateResolved}
									value={this.state.dateResolved}
									type="number"
									name="dateResolved"
									id="dateResolved"
									placeholder="dateResolved"
									required
								/>
							</Col>
						</FormGroup>

						<FormGroup row>
							<Label for="resolver" sm={2}>
								resolver
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateResolver}
									value={this.state.resolver}
									type="number"
									name="resolver"
									id="resolver"
									placeholder="resolver"
									required
								/>
							</Col>
						</FormGroup>

						<FormGroup row>
							<Label for="status" sm={2}>
								status
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateStatus}
									value={this.state.status}
									type="number"
									name="status"
									id="status"
									placeholder="status"
									required
								/>
							</Col>
						</FormGroup>

						<FormGroup row>
							<Label for="type" sm={2}>
								type
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateType}
									value={this.state.type}
									type="number"
									name="type"
									id="type"
									placeholder="type"
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
