"use client";

import Header from "@/components/Header";

const Dashboard = ({ session }) => {
  return (
    <div>
      <Header session={session}/>
      <div className="flex min-h-[90vh] justify-center items-center">
        Welcome {session.user.name}
      </div>
    </div>
  );
};

export default Dashboard;
