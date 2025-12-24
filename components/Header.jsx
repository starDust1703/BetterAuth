"use client";

import { useEffect, useState } from "react";
import UserButton from "./UserButton";
import ThemeToggle from "./ThemeToggler";

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
			<div className={"fixed top-0 left-0 w-screen z-50"}>
				<div
					className={`
        p-2 flex justify-around items-center
        transition-all duration-300 ease-in-out place-self-center

        ${scrolled
							? `
              w-[60vw] mt-2 rounded-2xl
              backdrop-blur-sm
              bg-indigo-500/40 dark:bg-indigo-400/20
              border border-zinc-300/60 dark:border-zinc-700
            `
							: `
              w-screen
              bg-white dark:bg-zinc-950
              border-b border-zinc-300 dark:border-zinc-800
            `
						}
      `}
				>
					<p className={"text-2xl font-semibold text-zinc-900 dark:text-zinc-100"}>
						Better Auth
					</p>
					<div className={"flex items-center gap-4"}>
						<ThemeToggle />
						<UserButton session={session} />
					</div>
				</div>
			</div>

			<div className={"h-20"}></div>
		</div>

	);
};

export default Header;
