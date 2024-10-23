export interface EnvObject {
	PORT: number;
	MONGO_URI: string;
	NODE_ENV: string;
}
export default () => {
	const PORT = process.env.PORT || "3000";
	const MONGO_URI = process.env.MONGO_URI || null;
	const NODE_ENV = process.env.NODE_ENV || "prod";
	const JWT_KEY = process.env.JWT_KEY;

	if (JWT_KEY === undefined) {
		throw new Error("JWT_KEY is not provided.");
	}
	if (parseInt(PORT) === 3000) {
		console.warn("Running on default port 3000");
	}
	if (NODE_ENV?.toLowerCase() === "dev") {
		console.warn(
			"Deploying with development mode. Recommend 'prod' in Production"
		);
	}
	if (MONGO_URI === null) {
		throw new Error("MONGO_URI is not provided");
	}
	return {
		PORT: parseInt(PORT),
		MONGO_URI,
		NODE_ENV,
	};
};
