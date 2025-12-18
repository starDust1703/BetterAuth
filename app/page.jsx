"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex w-screen h-screen justify-center items-center gap-2">
      <button
        className="p-2 bg-cyan-400 rounded-2xl active:border border-2 border-[#07a2d1] px-8 cursor-pointer"
        onClick={() => router.push('/auth/signin')}>Sign In</button>
      <button
        className="p-2 bg-cyan-400 rounded-2xl active:border border-2 border-[#07a2d1] px-8 cursor-pointer"
        onClick={() => router.push('/auth/signup')}>Sign Up</button>
    </div>
  );
}
