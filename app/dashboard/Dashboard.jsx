"use client";

import Header from "@/components/Header";

const Dashboard = ({ session }) => {
  return (
    <div className="flex w-screen h-screen justify-center items-center gap-4">
      <Header session={session}/>
      Welcome {session.user.name}
    </div>
  );
};

export default Dashboard;
