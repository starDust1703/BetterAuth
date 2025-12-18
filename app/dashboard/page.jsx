import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Dashboard from "./Dashboard";

export default async function DashboardServer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  async function deleteAcc() {
    "use server";
    await auth.api.deleteUser({
      userId: session.user.id,
    });
    redirect("/");
  }

  return <Dashboard session={session} deleteAcc={deleteAcc} />;
}
