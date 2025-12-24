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
    <div className={"min-h-screen flex justify-center items-center w-full h-full bg-zinc-50 dark:bg-zinc-950"}>
      <div className={"bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md dark:shadow-none border border-gray-200 dark:border-zinc-800"}>
        <span className={"text-2xl font-bold text-zinc-900 dark:text-zinc-100"}>
          Sign In
        </span>

        <p className={"text-sm text-gray-500 dark:text-zinc-400 mt-2"}>
          Enter your email below to login to your account
        </p>

        {error && (
          <div className={"w-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-2 rounded-md text-sm mt-2"}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={"flex flex-col gap-4 mt-4 w-75 items-center"}>
          <div className={"flex flex-col w-full gap-2"}>
            <label htmlFor="email" className={"font-semibold text-zinc-800 dark:text-zinc-200"}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="alex@example.com"
              className={"border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 shadow-sm p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className={"flex flex-col w-full gap-2"}>
            <label htmlFor="password" className={"font-semibold text-zinc-800 dark:text-zinc-200"}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              minLength={8}
              className={"border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 shadow-sm p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`
          w-full p-2 rounded-lg font-medium
          bg-zinc-900 text-white
          hover:bg-zinc-800
          dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200
          transition
          ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
        `}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>

          <p className={"text-gray-400 dark:text-zinc-500"}>
            Don't have an account?{" "}
            <span
              className={"text-zinc-900 dark:text-zinc-100 underline cursor-pointer"}
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
