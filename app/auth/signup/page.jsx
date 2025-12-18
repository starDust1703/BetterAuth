"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (confirmPassword != password) return;

		const { data, error } = await authClient.signUp.email({
			name: name,
			email: email,
			password: password,
			callbackURL: "/dashboard",
		}, {
			onRequest: (ctx) => {
				console.log("loading...")
			},
			onSuccess: (ctx) => {
				router.push('/dashboard')
			},
			onError: (ctx) => {
				console.log(ctx.error.message);
			}
		});
	};

	return (
		<div className="w-screen h-screen">
			<div className="flex justify-center items-center w-full h-full">
				<div className="bg-emerald-400 p-4 rounded-xl">
					<span className="text-2xl font-bold">SignUp</span>
					<form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4 w-75">
						<input
							type="text"
							placeholder="Name"
							className="border-b focus:outline-none text-black" onChange={e => setName(e.target.value)} />
						<input
							type="email"
							placeholder="Email"
							className="border-b focus:outline-none text-black" onChange={e => setEmail(e.target.value)} />
						<input
							type="password"
							placeholder="Password"
							className="border-b focus:outline-none text-black" onChange={e => setPassword(e.target.value)} />
						<input
							type="password"
							placeholder="Confirm Password"
							className="border-b focus:outline-none text-black" onChange={e => setConfirmPassword(e.target.value)} />
						<button type="submit" className="cursor-pointer bg-blue-600 self-center p-2 text-xl rounded-2xl w-40">Sign up</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
