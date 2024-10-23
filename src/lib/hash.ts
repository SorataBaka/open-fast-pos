import bcrypt from "bcrypt";
export const Hash = async (plain: string, rounds: number): Promise<string> => {
	return bcrypt.hash(plain, rounds);
};

export const Compare = async (
	plain: string,
	hash: string
): Promise<boolean> => {
	return bcrypt.compare(plain, hash);
};
