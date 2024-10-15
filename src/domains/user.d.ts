export interface User {
	username: string;
	password_hash: string;
	created_at: Date;
}
export interface UserRegister {
	username: string;
	password: string;
}
//eslint-disable-next-line
export interface UserDocument extends User {}
