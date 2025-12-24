"use client";

import Header from "@/components/Header";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Settings = ({ session }) => {
	const router = useRouter();
	const [userName, setUserName] = useState(session.user.name);
	const [email, setEmail] = useState(session.user.email);

	const updateName = async (e) => {
		e.preventDefault();
		await authClient.updateUser({
			name: userName
		})
	}
	const updateEmail = async (e) => {
		e.preventDefault();
		await authClient.changeEmail({
			newEmail: email
		})
	}

	return (
		<div className={"bg-zinc-50 dark:bg-zinc-950 min-h-screen"}>
			<Header session={session} />

			<div className={"min-h-[85vh] flex"}>
				<nav className={"fixed left-0 flex flex-col p-4 gap-4 w-75"}>
					<button
						className={"p-2 rounded-xl text-gray-600 dark:text-zinc-300 w-full cursor-pointer text-start pl-5 hover:text-black dark:hover:text-white"}
					>
						Account
					</button>
					<button
						className={"p-2 rounded-xl text-gray-600 dark:text-zinc-300 w-full cursor-pointer text-start pl-5 hover:text-black dark:hover:text-white hover:bg-[#0000001e] dark:hover:bg-zinc-800"}
						onClick={() => router.push("/account/security")}
					>
						Security
					</button>
				</nav>

				<div className={"w-75"} />

				<div className={"w-[50vw] flex flex-col gap-8"}>
					<form
						onSubmit={updateName}
						className={"shadow-sm rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"}
					>
						<div className={"p-4 flex flex-col gap-2"}>
							<p className={"font-semibold text-lg text-zinc-900 dark:text-zinc-100"}>Name</p>
							<p className={"text-sm text-gray-400 dark:text-zinc-400 mb-2"}>
								Please enter your full name, or a display name
							</p>
							<input
								type="text"
								value={userName}
								placeholder="Name"
								required
								minLength={3}
								maxLength={32}
								className={"p-2 shadow border-2 border-gray-300 dark:border-zinc-700 rounded-xl w-full focus:outline-gray-400 dark:focus:outline-zinc-400 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"}
								onChange={(e) => setUserName(e.target.value)}
							/>
						</div>
						<div className={"border-t border-t-gray-300 dark:border-t-zinc-700 p-4 flex justify-between items-center rounded-b-xl bg-gray-50 dark:bg-zinc-900"}>
							<p className={"text-gray-500 dark:text-zinc-400 text-sm"}>
								Name length should be between 3 and 32 characters
							</p>
							<button
								type="submit"
								className={"cursor-pointer p-2 rounded-xl text-white bg-black px-4"}
							>
								Save
							</button>
						</div>
					</form>

					<form
						onSubmit={updateEmail}
						className={"shadow-sm rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"}
					>
						<div className={"p-4 flex flex-col gap-2"}>
							<p className={"font-semibold text-lg text-zinc-900 dark:text-zinc-100"}>Email</p>
							<p className={"text-sm text-gray-400 dark:text-zinc-400 mb-2"}>
								Enter the email address you want to use to log in
							</p>
							<input
								type="email"
								value={email}
								placeholder="alex@example.com"
								required
								minLength={3}
								maxLength={32}
								className={"p-2 shadow border-2 border-gray-300 dark:border-zinc-700 rounded-xl w-full focus:outline-gray-400 dark:focus:outline-zinc-400 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className={"border-t border-t-gray-300 dark:border-t-zinc-700 p-4 flex justify-between items-center rounded-b-xl bg-gray-50 dark:bg-zinc-900"}>
							<p className={"text-gray-500 dark:text-zinc-400 text-sm"}>
								Please enter a valid email address
							</p>
							<button
								type="submit"
								className={"cursor-pointer p-2 rounded-xl text-white bg-black px-4"}
							>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Settings