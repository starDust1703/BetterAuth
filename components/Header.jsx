"use client";

import { useEffect, useState } from "react";
import UserButton from "./UserButton";

const Header = ({ session }) => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

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
					<UserButton session={session}/>
				</div>
			</div>
			<div className="h-15"></div>
		</div>
	);
};

export default Header;
