import { UserDocument } from "@domain/user";
import { JWTVerifyResult, SignJWT, jwtVerify } from "jose";

export const GenerateJwt = (user: UserDocument): Promise<string> => {
	const JWT_KEY = process.env.JWT_KEY;
	if (JWT_KEY === undefined) throw new Error("JWT_KEY not provided");
	const secret = new TextEncoder().encode(JWT_KEY);
	return new SignJWT({
		username: user.username,
		_id: user._id,
	})
		.setProtectedHeader({ alg: "HS512" })
		.setIssuedAt(new Date())
		.setNotBefore(new Date())
		.setExpirationTime("2d")
		.setAudience("open-fast-pos")
		.sign(secret);
};

export const ValidateJwt = (jwt: string): Promise<JWTVerifyResult> => {
	const JWT_KEY = process.env.JWT_KEY;
	if (JWT_KEY === undefined) {
		throw new Error("JWT_KEY not provided");
	}
	const secret = new TextEncoder().encode(JWT_KEY);
	return jwtVerify(jwt, secret, {
		audience: "open-fast-pos",
	});
};
