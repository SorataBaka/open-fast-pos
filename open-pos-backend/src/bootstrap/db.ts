import mongoose from "mongoose";
import { EnvObject } from "@domain/env";
export default async (env: EnvObject) => {
	// Handling all Mongoose connection events
	mongoose.connection.on("connected", () => {
		console.log(
			new Date().toLocaleTimeString() + ": Mongoose connected to the database"
		);
	});

	mongoose.connection.on("error", (err) => {
		console.error(
			new Date().toLocaleTimeString() + ": Mongoose connection error:",
			err
		);
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Mongoose disconnected from the database");
	});

	mongoose.connection.on("reconnected", () => {
		console.log("Mongoose reconnected to the database");
	});

	mongoose.connection.on("reconnectFailed", () => {
		console.error("Mongoose failed to reconnect");
	});

	mongoose.connection.on("close", () => {
		console.log("Mongoose connection closed");
	});

	mongoose.connection.on("fullsetup", () => {
		console.log("Mongoose connected to all replicas (for replica sets)");
	});

	mongoose.connection.on("all", () => {
		console.log("Mongoose connected to all nodes (for replica sets)");
	});

	mongoose.connection.on("reconnectTries", (num) => {
		console.log(`Mongoose retrying connection (#${num})`);
	});

	await mongoose.connect(env.MONGO_URI);
};
