"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
      rememberMe: true
    }, {
      //callbacks
    })
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full h-full">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <span className="text-2xl font-bold">Sign In</span>
        <p className="text-sm text-gray-500">Enter your email below to login to your account</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-75 items-center">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              id="email"
              type="email"
              placeholder="alex@example.com"
              className="border border-[#e6e6e6] shadow-sm p-2 rounded-md w-full focus:outline-none" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="password" className="font-semibold">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="border border-[#e6e6e6] shadow-sm p-2 rounded-md w-full focus:outline-none" onChange={e => setPassword(e.target.value)} />
            </div>
          <button type="submit" className="cursor-pointer bg-black self-center w-full p-2 rounded-lg text-white">Login</button>
          <p className="text-gray-400">Don't have an account? <span className="text-black underline cursor-pointer" onClick={() => router.push('/auth/signup')}>Sign Up</span></p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
