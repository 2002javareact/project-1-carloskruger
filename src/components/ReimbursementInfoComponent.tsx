import React from "react";
import { Card, CardTitle, CardText } from "reactstrap";
import { Reimbursement } from "../models/Reimbursement";
import { Redirect } from "react-router";
import { Table } from "reactstrap";

interface IReimbursementInfoProps {
	currentReimbursement: Reimbursement;
}

export class ReimbursementInfoComponent extends React.Component<
	IReimbursementInfoProps,
	any
> {
	render() {
		return this.props.currentReimbursement.reimbursementId ? (
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>reimbursementId</th>
						<th>author</th>
						<th>amount</th>
						<th>description</th>
						<th>date submitted</th>
						<th>date resolved</th>
						<th>resolver</th>
						<th>status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row"></th>
						<td>{this.props.currentReimbursement.reimbursementId}</td>
						<td>{this.props.currentReimbursement.author}</td>
						<td>{this.props.currentReimbursement.amount}</td>
						<td>{this.props.currentReimbursement.description}</td>
						<td>{this.props.currentReimbursement.dateSubmitted}</td>
						<td>{this.props.currentReimbursement.dateResolved}</td>
						<td>{this.props.currentReimbursement.resolver}</td>
						<td>{this.props.currentReimbursement.status}</td>
					</tr>
				</tbody>
			</Table>
		) : (
			<Redirect to="/login" />
		);
	}
}
