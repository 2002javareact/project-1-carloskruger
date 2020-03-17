import { User } from "../models/User";
import { BadCredentialsError } from "../errors/BadCredentialsError";
import { InternalServerError } from "../errors/InternalServerError";
import { serverClient } from "./client";

export async function updateUser(
	userId: number,
	username: string,
	password: string,
	firstName: string,
	lastName: string,
	email: string
): Promise<User> {
	let credentials = {
		userId,
		username,
		password,
		firstName,
		lastName,
		email
	};
	try {
		console.log("credentials", credentials);
		let response = await serverClient.patch("/users", credentials);
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
