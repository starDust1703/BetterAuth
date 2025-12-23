"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPass, setShowPass] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		await authClient.signUp.email({
			name: name,
			email: email,
			password: password,
			callbackURL: "/dashboard",
		}, {
			onSuccess: (ctx) => {
				router.push('/dashboard')
			},
			onError: (ctx) => {
				setIsLoading(false);
				setError(ctx.error.message);
			}
		});
	};

	return (
		<div className="min-h-screen flex justify-center items-center w-full h-full">
			<div className="bg-white p-4 rounded-xl shadow-md">
				<span className="text-2xl font-bold">Sign Up</span>
				<p className="text-sm text-gray-500 mt-2">Enter your informtaion to create an account</p>
				{error && (
					<div className="w-full bg-red-100 text-red-700 p-2 rounded-md text-sm">
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-75 items-center">
					<div className="flex flex-col w-full gap-2">
						<label htmlFor="name" className="font-semibold">Name</label>
						<input
							id="name"
							type="name"
							required
							minLength={3}
							maxLength={32}
							placeholder="Name"
							className="border border-[#e6e6e6] shadow-sm p-2 rounded-md w-full focus:outline-none" onChange={e => setName(e.target.value)} />
					</div>
					<div className="flex flex-col w-full gap-2">
						<label htmlFor="email" className="font-semibold">Email</label>
						<input
							id="email"
							type="email"
							required
							placeholder="alex@example.com"
							className="border border-[#e6e6e6] shadow-sm p-2 rounded-md w-full focus:outline-none" onChange={e => setEmail(e.target.value)} />
					</div>
					<div className="flex flex-col w-full gap-2">
						<label htmlFor="password" className="font-semibold">Password</label>
						<div className="flex border border-[#e6e6e6] shadow-sm p-2 rounded-md w-full">
							<input
								id="password"
								type={showPass ? "text" : "password"}
								required
								minLength={5}
								placeholder="Password"
								className="w-full mr-4 focus:outline-none" onChange={e => setPassword(e.target.value)} />
							<img src={showPass ? "/eyeOff.svg" : "/eyeOn.svg"} alt={showPass ? "hide" : "show"} className="cursor-pointer w-6" onClick={() => setShowPass(!showPass)} />
						</div>
					</div>
					<button type="submit" className={`bg-black self-center w-full p-2 rounded-lg text-white ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`} disabled={isLoading}>Create an account</button>
					<p className="text-gray-400">Already have an account? <span className="text-black underline cursor-pointer" onClick={() => router.push('/auth/signin')}>Sign In</span></p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
