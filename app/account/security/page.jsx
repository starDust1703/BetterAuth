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

	const updatePassword = async (e) => {
		e.preventDefault();
		await authClient.changePassword({
			newPassword: newPassword,
			currentPassword: currPassword,
			revokeOtherSessions: true,
		});
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
		<div className="mb-20">
			<Header session={currSession} />

			<div className="min-h-[90vh]">
				<div className="flex">
					<nav className="fixed left-0 flex flex-col p-4 gap-4 w-75">
						<button className="p-2 rounded-xl text-gray-600 w-full cursor-pointer text-start pl-5 hover:text-black hover:bg-[#0000001e]" onClick={() => router.push('/account/settings')}>Account</button>
						<button className="p-2 rounded-xl w-full cursor-pointer text-start pl-5">Security</button>
					</nav>
					<div className="w-75"></div>
					<div className="min-w-[50vw] flex flex-col gap-8">
						<form onSubmit={updatePassword} className="shadow-sm rounded-xl border border-gray-200">
							<div className="p-4 flex flex-col gap-2">
								<p className="font-semibold text-xl">Change Password</p>
								<p className="text-sm text-gray-400 mb-2">Enter your current password and a new password</p>
								<label htmlFor="curr" className="font-semibold">Current Password</label>
								<input
									type="text"
									id="curr"
									value={currPassword}
									placeholder="Current Password"
									required
									minLength={8}
									className="p-2 shadow border-2 border-gray-300 rounded-xl w-full focus:outline-gray-400"
									onChange={(e) => setCurrPassword(e.target.value)} />
								<label htmlFor="new" className="font-semibold">New Password</label>
								<div className="flex border-2 border-gray-300 shadow p-2 rounded-xl w-full focus-within:border-gray-400">
									<input
										id="new"
										type={showPass ? "text" : "password"}
										value={newPassword}
										required
										minLength={8}
										placeholder="New Password"
										className="w-full mr-4 focus:outline-none"
										onChange={e => setNewPassword(e.target.value)} />
									<img src={showPass ? "/eyeOff.svg" : "/eyeOn.svg"} alt={showPass ? "hide" : "show"} className="cursor-pointer w-6" onClick={() => setShowPass(!showPass)} />
								</div>
							</div>
							<div className="border-t border-t-gray-300 p-4 flex justify-between items-center bg-gray-50">
								<p className="text-gray-500 text-sm">Please use 8 characters at minimum</p>
								<button type="submit" className="cursor-pointer p-2 rounded-xl text-white bg-black px-4">Save</button>
							</div>
						</form>
						<div className="shadow-sm rounded-xl p-4 border border-gray-200 flex flex-col gap-4">
							<div className="flex flex-col">
								<p className="font-semibold text-lg">Sessions</p>
								<p className="text-sm text-gray-400 mb-2">Manage your active sessions and revoke access</p>
							</div>
							<div className="shadow-sm rounded-xl border border-gray-200 p-4">
								<div className="flex justify-between items-center">
									<div className="flex flex-col">
										<p className="font-semibold ">Current Session</p>
										<p className="text-xs text-gray-400">Manage your active sessions and revoke access</p>
									</div>
									<button className="shadow-md border border-gray-300 p-2 px-4 rounded-xl text-sm font-semibold cursor-pointer" onClick={() => signOut()}>Sign Out</button>
								</div>
							</div>
							{sessions.map((ses) => {
								if (ses.token !== currSession.session.token)
									return (
										<div key={ses.token} className="shadow-sm rounded-xl border border-gray-200 p-4">
											<div>{ses.ipAddress}</div>
										</div>
									)
							})}
						</div>
						<div className="shadow-sm rounded-xl p-4 border border-gray-200 flex flex-col gap-4">
							<div className="flex flex-col">
								<p className="font-semibold text-lg">Delete Account</p>
								<p className="text-sm text-gray-400 mb-2">Permanently delete your account. This will remove all linked sessions</p>
							</div>
							<div className="flex justify-between items-center">
								<button className="shadow-md bg-red-600 text-white border border-gray-300 p-2 px-4 rounded-xl text-sm font-semibold cursor-pointer" onClick={() => deleteAccount()}>Delete my account</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Settings