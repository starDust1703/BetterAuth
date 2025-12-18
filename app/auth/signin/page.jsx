"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center w-full h-full">
        <div className="bg-emerald-400 p-4 rounded-xl">
          <span className="text-2xl font-bold">Sign In</span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4 w-75">
            <input
              type="email"
              placeholder="Email"
              className="border-b focus:outline-none text-black" onChange={e => setEmail(e.target.value)} />
            <input
              type="password"
              placeholder="Password"
              className="border-b focus:outline-none text-black" onChange={e => setPassword(e.target.value)} />
            <button type="submit" className="cursor-pointer bg-blue-600 self-center p-2 text-xl rounded-2xl w-40">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
