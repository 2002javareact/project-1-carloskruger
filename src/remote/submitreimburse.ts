import { Reimbursement } from "../models/Reimbursement";
import { BadCredentialsError } from "../errors/BadCredentialsError";
import { InternalServerError } from "../errors/InternalServerError";
import { serverClient } from "./client";

export async function submitReimbursement(
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
		author,
		amount,
		dateSubmitted,
		dateResolved,
		description,
		resolver,
		status,
		type
	};
	try {
		let response = await serverClient.post("/reimbursements", credentials);
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
