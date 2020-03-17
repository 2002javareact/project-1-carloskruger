import { Reimbursement } from "../models/Reimbursement";
import { BadCredentialsError } from "../errors/BadCredentialsError";
import { InternalServerError } from "../errors/InternalServerError";
import { serverClient } from "./client";

export async function updateReimbursement(
	reimbursementId: number,
	author: number,
	amount: number,
	description: string,
	dateSubmitted: number,
	dateResolved: number,
	resolver: number,
	status: number,
	type: number
): Promise<Reimbursement> {
	let credentials = {
		reimbursementId,
		author,
		amount,
		description,
		dateSubmitted,
		dateResolved,
		resolver,
		status,
		type
	};
	try {
		let response = await serverClient.patch("/reimbursements", credentials);
		console.log(response);
		if (response.status === 404) {
			throw new BadCredentialsError();
		}

		return response.data;
	} catch (e) {
		if (e.status === 404) {
			throw e;
		} else {
			throw new InternalServerError();
		}
	}
}
