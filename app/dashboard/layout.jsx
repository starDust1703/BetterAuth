import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Dashboard from "./page";

export default async function AuthLayout({ children }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) redirect('/');
    return <Dashboard session={session}/>
}
