"use client";

import Header from "@/components/Header";

const Dashboard = ({ session }) => {
  return (
    <div className={"bg-zinc-50 dark:bg-zinc-950 min-h-screen"}>
      <Header session={session} />

      <div className={"flex min-h-[85vh] justify-center items-center"}>
        <p className={"text-xl font-medium text-zinc-900 dark:text-zinc-100"}>
          Welcome {session.user.name}
        </p>
      </div>
    </div>

  );
};

export default Dashboard;
