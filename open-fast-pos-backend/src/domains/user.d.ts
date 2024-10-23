import { Document } from "mongoose";
export interface User {
	username: string;
	password_hash: string;
	created_at: Date;
}
export interface UserRegister {
	username: string;
	password: string;
}

export interface UserDocument extends Document, User {}
