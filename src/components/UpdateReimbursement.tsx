import React, { SyntheticEvent } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { updateReimbursement } from "../remote/updateReimbursement";
import { User } from "../models/User";
import { Redirect } from "react-router";
import { Table } from "reactstrap";

interface IUpdateReimbursementProps {
	currentUser: User;
}

interface IUpdateState {
	reimbursementId: number; // primary key
	author: number; // foreign key -> User, not null
	amount: number; // not null
	description: string; // not null
	dateSubmitted: number; // not null
	dateResolved: number; // not null
	resolver: number; // foreign key -> User
	status: number; // foreign ey -> ReimbursementStatus, not null
	type: number;
	errorMessage: string;
	user: User | undefined;
}

export class UpdateReimburseComponent extends React.Component<
	IUpdateReimbursementProps,
	IUpdateState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			reimbursementId: 0,
			author: 0,
			amount: 0, // not null
			description: "", // not null
			dateSubmitted: 0, // not null
			dateResolved: 0, // not null
			resolver: 0, // foreign key -> User
			status: 0, // foreign ey -> ReimbursementStatus, not null
			type: 0,
			errorMessage: "",
			user: undefined
		};
	}

	submitUpdt = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			let reimbursement = await updateReimbursement(
				this.state.reimbursementId,
				this.state.author,
				this.state.amount,
				this.state.description,
				this.state.dateSubmitted,
				this.state.dateResolved,
				this.state.resolver,
				this.state.status,
				this.state.type
			);
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

	updateReimbursementId = (e: any) => {
		this.setState({
			reimbursementId: e.currentTarget.value
		});
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

	updateDescription = (e: any) => {
		this.setState({
			description: e.currentTarget.value
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
		return (
			<>
				{/* a react Fragment, disappears on render */}
				<div>
					<h2>Update Reimbursement</h2>
					<Form onSubmit={this.submitUpdt}>
						<FormGroup row>
							<Label for="reimbursementId" sm={2}>
								ReimbursementId for reimbursement to Update
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateReimbursementId}
									value={this.state.reimbursementId}
									type="number"
									name="reimbursementId"
									id="reimbursementId"
									placeholder="Enter the reimbursementId for the reimbursement to update"
								/>
							</Col>
						</FormGroup>
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
									placeholder="author to update"
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="amount" sm={2}>
								Amount
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateAmount}
									value={this.state.amount}
									type="number"
									name="amount"
									id="amount"
									placeholder="amountto update"
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
									placeholder="Description to update"
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
									placeholder="Date Submitted to update"
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
									id="datResolved"
									placeholder="update Date Resolved"
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
									placeholder="update resolver"
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="status" sm={2}>
								Status
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateStatus}
									value={this.state.status}
									type="number"
									name="status"
									id="status"
									placeholder="update status"
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
									placeholder="update type"
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
