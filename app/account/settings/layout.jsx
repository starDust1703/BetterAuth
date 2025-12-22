import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Settings from "./page";

export default async function AuthLayout({ children }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) redirect('/');
    return <Settings session={session}/>
}
