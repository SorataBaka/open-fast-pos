export interface DefaultResponse {
	status: number;
	message: string;
	code: string;
	valid: boolean;
	path: string;
}

export interface OKResponse<T> {
	status: number;
	message: string;
	code: string;
	valid: boolean;
	data: T;
}

export interface InvalidResponse<T> {
	status: number;
	message: string;
	code: string;
	valid: boolean;
	error: T;
}

export interface NotFoundResponse {
	status: number;
	message: string;
	code: string;
	valid: boolean;
	path: string;
}
