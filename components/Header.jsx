"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Header = ({ session }) => {
	const router = useRouter();
	const [showMore, setShowMore] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", onScroll);

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
			window.removeEventListener("scroll", onScroll);
			document.removeEventListener("mousedown", handleClickOutside);
		}
	}, []);


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
		<div>
			<div className="fixed top-0 left-0 w-screen">
				<div
					className={`p-2 flex justify-around items-center
    transition-all duration-300 ease-in-out place-self-center
    ${scrolled
							? "w-[60vw] backdrop-blur-xs bg-[#6767ff79] border-b border-b-gray-300 rounded-2xl mt-2 "
							: "w-screen bg-white border-b border-b-gray-300"}
  `}
				>
					<p className="text-2xl font-semibold">Better Auth</p>

					<div className="relative" ref={dropdownRef}>
						<img
							src="/user.svg"
							alt="user"
							className="w-8 cursor-pointer rounded-full"
							onClick={() => setShowMore(!showMore)}
						/>

						<div
							className={`
            flex flex-col items-start absolute -right-10 mt-4
            bg-white rounded-md w-60 shadow
            transform transition-all duration-200 ease-out
            ${showMore
									? "scale-100 opacity-100 pointer-events-auto"
									: "scale-95 opacity-0 pointer-events-none"}
          `}
						>
							<div className="flex gap-2 items-center p-2 border-b border-b-gray-400 w-full">
								<img src="/user.svg" alt="user" className="w-8 rounded-full" />
								<div>
									<p>{session.user.name}</p>
									<p className="text-sm text-gray-500">{session.user.email}</p>
								</div>
							</div>
							<button className="p-2 cursor-pointer flex gap-2 items-center w-full transition-colors duration-300 ease-in-out hover:bg-gray-300" onClick={() => router.push('/account/settings')}>
								<img src="/setting.svg" alt="settings" className="w-6" />
								<p>Settings</p>
							</button>
							<button className="p-2 cursor-pointer flex gap-2 items-center w-full transition-colors duration-300 ease-in-out hover:bg-gray-300 rounded-b-md" onClick={() => signOut()}>
								<img src="/sign_out.svg" alt="" className="w-4 ml-2" />
								<p>Sign Out</p>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="h-15"></div>
		</div>
	);
};

export default Header;
