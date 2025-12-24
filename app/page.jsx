"use client";
import ThemeToggle from "@/components/ThemeToggler";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className={"flex w-screen min-h-screen justify-center items-center gap-2 bg-zinc-50 dark:bg-zinc-950"}>
      <ThemeToggle />
      <button
        className={"p-2 rounded-2xl border-2 px-8 cursor-pointer bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 active:border-gray-400 dark:active:border-zinc-600"}
        onClick={() => router.push('/auth/signin')}
      >
        Sign In
      </button>
      <button
        className={"p-2 rounded-2xl border-2 px-8 cursor-pointer bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 active:border-gray-400 dark:active:border-zinc-600"}
        onClick={() => router.push('/auth/signup')}
      >
        Sign Up
      </button>
    </div>
  );
}
