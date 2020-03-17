import { InternalServerError } from "../errors/InternalServerError";
import { serverClient } from "./client";

export const getUsersById = async (userId: number) => {
	try {
		let response = await serverClient.get(`/users/${userId}`);
		//	console.log("getUsersById", response);
		if (response.status === 200) {
			return response.data;
		} else {
			throw new InternalServerError();
		}
	} catch (e) {
		throw new InternalServerError();
	}
};
