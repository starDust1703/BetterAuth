"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
      rememberMe: true
    }, {
      onSuccess: () => router.push("/dashboard"),
      onError: (ctx) => {
        setIsLoading(false);
        setError(ctx.error.message);
      }
    })
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full h-full">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <span className="text-2xl font-bold">Sign In</span>
        <p className="text-sm text-gray-500 mt-2">Enter your email below to login to your account</p>
        {error && (
          <div className="w-full bg-red-100 text-red-700 p-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-75 items-center">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="alex@example.com"
              className="border border-[#e6e6e6] shadow-sm p-2 rounded-md w-full focus:outline-none" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="password" className="font-semibold">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="border border-[#e6e6e6] shadow-sm p-2 rounded-md w-full focus:outline-none"
              required
              minLength={5}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className={`bg-black self-center w-full p-2 rounded-lg text-white ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`} disabled={isLoading}>Login</button>
          <p className="text-gray-400">Don't have an account? <span className="text-black underline cursor-pointer" onClick={() => router.push('/auth/signup')}>Sign Up</span></p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
