import { InternalServerError } from "../errors/InternalServerError";
import { serverClient } from "./client";

export const getReimbursementByStatusId = async (statusId: number) => {
	try {
		let response = await serverClient.get(`/reimbursements/status/${statusId}`);
		console.log("getReimbursementByStatusId", response);
		if (response.status === 200) {
			return response.data;
		} else {
			throw new InternalServerError();
		}
	} catch (e) {
		throw new InternalServerError();
	}
};
