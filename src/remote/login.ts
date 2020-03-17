import { User } from "../models/User";
import { BadCredentialsError } from "../errors/BadCredentialsError";
import { InternalServerError } from "../errors/InternalServerError";
import { serverClient } from "./client";

export async function login(username: string, password: string): Promise<User> {
	let credentials = {
		username,
		password
	};
	try {
		let response = await serverClient.post("/login", credentials);
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
