import { UserDocument } from "@domain/user";
import mongoose from "mongoose";

const User = new mongoose.Schema<UserDocument>({
	username: {
		type: String,
		required: true,
		trim: true,
		min: 5,
		max: 10,
		validate: {
			validator: function (v) {
				return /^[a-zA-Z0-9]+$/.test(v);
			},
			message: "Username needs to be alphanumeric between 5 and 10",
		},
	},
	password_hash: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		required: true,
	},
});

export default mongoose.model("users", User);
