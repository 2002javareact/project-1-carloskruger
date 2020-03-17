import React, { SyntheticEvent } from "react";
import { Reimbursement } from "../models/Reimbursement";
import { User } from "../models/User";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { CardDeck } from "./CardDeckComponent";
import { ReimbursementInfoComponent } from "./ReimbursementInfoComponent";
import { Redirect } from "react-router";
import { getReimbursementByUser } from "../remote/findReimbursementsByUser";
import { Table } from "reactstrap";

interface IViewReimburseProps {
	currentUser: User;
}

interface IReimbByUser {
	reimbursements: Reimbursement[];
	userId: number;
	errorMessage: string;
}

export class ViewReimByUser extends React.Component<
	IViewReimburseProps,
	IReimbByUser
> {
	constructor(props: any) {
		super(props);
		this.state = {
			reimbursements: [],
			userId: 0,
			errorMessage: ""
		};
	}

	submitRequest = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			let reimbursements = await getReimbursementByUser(this.state.userId);
			console.log("reimbursements", reimbursements);
			// this.props.history.push('/clicker') // if we run this, it takes them to that path
			this.setState({
				reimbursements: reimbursements
			});
		} catch (e) {
			if (e.status === 404) {
				this.setState({
					userId: 0,
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
		let reimbursementDisplay = this.state.reimbursements.map(
			(ele: Reimbursement) => {
				return (
					<ReimbursementInfoComponent
						currentReimbursement={ele}
						key={ele.reimbursementId}
					/>
				);
			}
		);
		console.log("this.state.userId", this.state.userId);

		return this.state.reimbursements.length > 0 ? (
			<Table>
				<CardDeck elementsPerRow={4}>{reimbursementDisplay}</CardDeck>
			</Table>
		) : (
			<>
				{/* a react Fragment, disappears on render */}
				<div>
					<p>Find Reimbursements by User</p>
					<Form onSubmit={this.submitRequest}>
						<FormGroup row>
							<Label for="userId" sm={2}>
								Enter the status Id for the reimbursements, you want to view
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateUserId}
									value={this.state.userId}
									type="number"
									name="userId"
									id="userId"
									placeholder="Enter a User Id to see which reimbursements were submitted "
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
