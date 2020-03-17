import React, { SyntheticEvent } from "react";
import { Reimbursement } from "../models/Reimbursement";
import { User } from "../models/User";
import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { CardDeck } from "./CardDeckComponent";
import { ReimbursementInfoComponent } from "./ReimbursementInfoComponent";
import { Redirect } from "react-router";
import { getReimbursementByStatusId } from "../remote/findReimbursementByStatus";
import { Table } from "reactstrap";

interface IViewReimburseProps {
	currentUser: User;
}

interface IReimbByStatus {
	reimbursements: Reimbursement[];
	statusId: number;
	errorMessage: string;
}

export class ViewReimByStatus extends React.Component<
	IViewReimburseProps,
	IReimbByStatus
> {
	constructor(props: any) {
		super(props);
		this.state = {
			reimbursements: [],
			statusId: 0,
			errorMessage: ""
		};
	}

	submitRequest = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			let reimbursements = await getReimbursementByStatusId(
				this.state.statusId
			);
			console.log("reimbursements", reimbursements);
			// this.props.history.push('/clicker') // if we run this, it takes them to that path
			this.setState({
				reimbursements: reimbursements
			});
		} catch (e) {
			if (e.status === 404) {
				this.setState({
					statusId: 0,
					errorMessage: e.message
				});
			} else {
				this.setState({
					errorMessage: "Something Went Wrong. Oops!"
				});
			}
		}
	};

	updateStatusId = (e: any) => {
		this.setState({
			statusId: e.currentTarget.value
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
		console.log("this.state.statusId", this.state.statusId);

		return this.state.reimbursements.length > 0 ? (
			<Table>
				<CardDeck elementsPerRow={4}>{reimbursementDisplay}</CardDeck>
			</Table>
		) : (
			<>
				{/* a react Fragment, disappears on render */}
				<div>
					<p>Find Reimbursements by Status Id</p>
					<Form onSubmit={this.submitRequest}>
						<FormGroup row>
							<Label for="statusId" sm={2}>
								Enter the status Id for the reimbursements, you want to view
							</Label>
							<Col sm={6}>
								<Input
									onChange={this.updateStatusId}
									value={this.state.statusId}
									type="number"
									name="statusId"
									id="statusId"
									placeholder="Enter the reimbursement status Id"
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
