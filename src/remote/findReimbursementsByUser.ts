import { InternalServerError } from "../errors/InternalServerError";
import { serverClient } from "./client";

export const getReimbursementByUser = async (userId: number) => {
	try {
		let response = await serverClient.get(
			`/reimbursements/author/userId/${userId}`
		);
		//	console.log("getReimbursementByUser", response);
		if (response.status === 200) {
			return response.data;
		} else {
			throw new InternalServerError();
		}
	} catch (e) {
		throw new InternalServerError();
	}
};
