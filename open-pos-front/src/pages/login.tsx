import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
export default function Home() {
	const router = useRouter();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const submitLogin = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		fetch("https://pos.tianharjuno.com/api/v1/auth/login", {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((fetchResult) => {
			if (fetchResult.status !== 200) {
				toast.error("Failed to login");
				return;
			}
			fetchResult.json().then((bodyJson) => {
				const tokenParsed: string =
					bodyJson.data.type + " " + bodyJson.data.token;
				localStorage.setItem("token", tokenParsed);
				router.push("/");
				return;
			});
		});
	};
	return (
		<main className="flex flex-col align-middle justify-center min-h-screen bg-slate-100">
			<form
				className="flex flex-col align-middle justify-center gap-8 w-1/3 mx-auto"
				onSubmit={submitLogin}
			>
				<h1 className="text-center text-3xl font-bold">Login</h1>
				<input
					type="text"
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
					className="p-3 rounded-xl shadow-lg"
					required
				/>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className="p-3 rounded-xl shadow-lg"
					required
				/>
				<input
					type="submit"
					className="bg-blue-700 text-white w-min mx-auto px-4 py-2 rounded-lg"
				/>
			</form>
		</main>
	);
}
