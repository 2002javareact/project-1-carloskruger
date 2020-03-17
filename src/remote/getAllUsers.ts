import { InternalServerError } from "../errors/InternalServerError";
import { serverClient } from "./client";

export const remoteGetAllUsers = async () => {
	try {
		let response = await serverClient.get("/users");
		if (response.status === 200) {
			return response.data;
		} else {
			throw new InternalServerError();
		}
	} catch (e) {
		throw new InternalServerError();
	}
};
