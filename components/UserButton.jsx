import { useEffect, useRef, useState } from 'react'
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const UserButton = ({ session }) => {
	const router = useRouter();
	const [showMore, setShowMore] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target)
			) {
				setShowMore(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		}
	}, [])
	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.replace("/");
				},
			},
		});
	};
	return (
		<div className={"relative"} ref={dropdownRef}>
			<img
				src="/user.svg"
				alt="user"
				className={"w-8 cursor-pointer rounded-full dark:invert"}
				onClick={() => setShowMore(!showMore)}
			/>

			<div
				className={`
      flex flex-col items-start absolute -right-10 mt-4
      bg-white dark:bg-zinc-900
      rounded-md w-60 shadow-md dark:shadow-none
      transform transition-all duration-200 ease-out
      ${showMore
						? "scale-100 opacity-100 pointer-events-auto"
						: "scale-95 opacity-0 pointer-events-none"
					}
    `}
			>
				<div className={"flex gap-2 items-center p-2 border-b border-gray-400 dark:border-zinc-700 w-full"}>
					<img src="/user.svg" alt="user" className={"w-8 rounded-full dark:invert"} />
					<div>
						<p className={"text-zinc-900 dark:text-zinc-100"}>{session.user.name}</p>
						<p className={"text-sm text-gray-500 dark:text-zinc-400"}>{session.user.email}</p>
					</div>
				</div>

				<button
					className={"p-2 cursor-pointer flex gap-2 items-center w-full transition-colors duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-800"}
					onClick={() => router.push("/account/settings")}
				>
					<img src="/setting.svg" alt="settings" className={"w-6 dark:invert"} />
					<p className={"text-zinc-900 dark:text-zinc-100"}>Settings</p>
				</button>

				<button
					className={"p-2 cursor-pointer flex gap-2 items-center w-full transition-colors duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-800 rounded-b-md"}
					onClick={() => signOut()}
				>
					<img src="/sign_out.svg" alt="sign out" className={"w-4 ml-2 dark:invert"} />
					<p className={"text-zinc-900 dark:text-zinc-100"}>Sign Out</p>
				</button>
			</div>
		</div>
	)
}

export default UserButton