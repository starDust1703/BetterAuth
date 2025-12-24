"use client";

import Header from "@/components/Header";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Settings = ({ currSession, sessions }) => {
	const router = useRouter();
	const [currPassword, setCurrPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [showPass, setShowPass] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const updatePassword = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		const { data, error } = await authClient.changePassword({
			newPassword: newPassword,
			currentPassword: currPassword,
			revokeOtherSessions: true,
		}, {
			onError: (ctx) => {
				setError(ctx.error.message);
			}
		});
		setIsLoading(false);
		setCurrPassword("");
		setNewPassword("");
	}
	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.replace("/");
				},
			},
		});
	};
	const deleteAccount = async () => {
		await authClient.deleteUser({
			callbackURL: '/',
		});
	}
	return (
		<div className={"pb-20 bg-zinc-50 dark:bg-zinc-950 min-h-screen"}>
			<Header session={currSession} />

			<div className={"min-h-[85vh] flex"}>
				<nav className={"fixed left-0 flex flex-col p-4 gap-4 w-75"}>
					<button
						className={"p-2 rounded-xl text-gray-600 dark:text-zinc-300 w-full cursor-pointer text-start pl-5 hover:text-black dark:hover:text-white hover:bg-[#0000001e] dark:hover:bg-zinc-800"}
						onClick={() => router.push("/account/settings")}
					>
						Account
					</button>
					<button
						className={"p-2 rounded-xl text-gray-600 dark:text-zinc-300 w-full cursor-pointer text-start pl-5 hover:text-black dark:hover:text-white"}
					>
						Security
					</button>
				</nav>

				<div className={"w-75"} />

				<div className={"min-w-[50vw] flex flex-col gap-8"}>
					<form
						onSubmit={updatePassword}
						className={"shadow-sm rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"}
					>
						<div className={"p-4 flex flex-col gap-2"}>
							<p className={"font-semibold text-xl text-zinc-900 dark:text-zinc-100"}>Change Password</p>
							<p className={"text-sm text-gray-400 dark:text-zinc-400 mb-2"}>
								Enter your current password and a new password
							</p>

							<label htmlFor="curr" className={"font-semibold text-zinc-900 dark:text-zinc-100"}>Current Password</label>
							<input
								id="curr"
								name="curr"
								type="text"
								value={currPassword}
								placeholder="Current Password"
								required
								minLength={8}
								className={"p-2 shadow border-2 border-gray-300 dark:border-zinc-700 rounded-xl w-full focus:outline-gray-400 dark:focus:outline-zinc-400 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"}
								onChange={(e) => setCurrPassword(e.target.value)}
							/>
							{error && (
								<div className={"w-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-400 p-2 rounded-md text-sm"}>
									{error}
								</div>
							)}

							<label htmlFor="new" className={"font-semibold text-zinc-900 dark:text-zinc-100"}>New Password</label>
							<div className={"flex border-2 border-gray-300 dark:border-zinc-700 shadow p-2 rounded-xl w-full focus-within:border-gray-400 dark:focus-within:border-zinc-400 bg-white dark:bg-zinc-800"}>
								<input
									id="new"
									name="new"
									type={showPass ? "text" : "password"}
									value={newPassword}
									required
									minLength={8}
									placeholder="New Password"
									className={"w-full mr-4 focus:outline-none bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
								<img
									src={showPass ? "/eyeOff.svg" : "/eyeOn.svg"}
									alt={showPass ? "hide" : "show"}
									className={"cursor-pointer w-6 dark:invert"}
									onClick={() => setShowPass(!showPass)}
								/>
							</div>
						</div>

						<div className={"border-t border-gray-300 dark:border-zinc-700 p-4 flex justify-between items-center rounded-b-xl bg-gray-50 dark:bg-zinc-900"}>
							<p className={"text-gray-500 dark:text-zinc-400 text-sm"}>Please use 8 characters at minimum</p>
							<button
								type="submit"
								className={`p-2 rounded-xl text-white bg-black px-4 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
								disabled={isLoading}
							>
								Update
							</button>
						</div>
					</form>

					<div className={"shadow-sm rounded-xl p-4 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col gap-4"}>
						<div className={"flex flex-col"}>
							<p className={"font-semibold text-lg text-zinc-900 dark:text-zinc-100"}>Sessions</p>
							<p className={"text-sm text-gray-400 dark:text-zinc-400 mb-2"}>
								Manage your active sessions and revoke access
							</p>
						</div>

						<div className={"shadow-sm rounded-xl border border-gray-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-800"}>
							<div className={"flex justify-between items-center"}>
								<div className={"flex flex-col"}>
									<p className={"font-semibold text-zinc-900 dark:text-zinc-100"}>Current Session</p>
									<p className={"text-xs text-gray-400 dark:text-zinc-400"}>Manage your active sessions and revoke access</p>
								</div>
								<button
									className={"shadow-md border border-gray-300 dark:border-zinc-700 p-2 px-4 rounded-xl text-sm font-semibold cursor-pointer bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"}
									onClick={() => signOut()}
								>
									Sign Out
								</button>
							</div>
						</div>

						{sessions.map((ses) => {
							if (ses.token !== currSession.session.token)
								return (
									<div key={ses.token} className={"shadow-sm rounded-xl border border-gray-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"}>
										<div>{ses.ipAddress}</div>
									</div>
								);
						})}
					</div>

					<div className={"shadow-sm rounded-xl p-4 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col gap-4"}>
						<div className={"flex flex-col"}>
							<p className={"font-semibold text-lg text-zinc-900 dark:text-zinc-100"}>Delete Account</p>
							<p className={"text-sm text-gray-400 dark:text-zinc-400 mb-2"}>
								Permanently delete your account. This will remove all linked sessions
							</p>
						</div>
						<div className={"flex justify-between items-center"}>
							<button
								className={"shadow-md bg-red-600 text-white border border-gray-300 dark:border-zinc-700 p-2 px-4 rounded-xl text-sm font-semibold cursor-pointer"}
								onClick={() => deleteAccount()}
							>
								Delete my account
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings