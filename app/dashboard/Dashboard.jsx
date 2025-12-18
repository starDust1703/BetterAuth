"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Dashboard = ({ session }) => {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
        },
      },
    });
  };

  const deleteAcc = async () => {
    await fetch("/api/deleteAcc", { method: "POST" });
    // router.replace("/");
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center gap-4">
      Welcome {session.user.name}
      <button
        onClick={signOut}
        className="p-2 bg-indigo-500 rounded-2xl cursor-pointer"
      >
        Sign Out
      </button>
      <button
        onClick={deleteAcc}
        className="p-2 bg-indigo-500 rounded-2xl cursor-pointer"
      >
        Delete Account
      </button>
    </div>
  );
};

export default Dashboard;
