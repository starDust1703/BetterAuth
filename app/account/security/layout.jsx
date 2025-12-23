import { auth, db } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Security from "./page";
import { ObjectId } from "mongodb";

export default async function AuthLayout({ children }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) redirect('/');
    const rawSessions = await db.collection("session").find({
        userId: new ObjectId(session.user.id)
    }).toArray();
    const sessions = rawSessions
        .map(s => ({
            _id: s._id.toString(),
            userId: s.userId.toString(),
            token: s.token,
            ipAddress: s.ipAddress,
            userAgent: s.userAgent,
            expiresAt: s.expiresAt.toISOString(),
            createdAt: s.createdAt.toISOString(),
            updatedAt: s.updatedAt.toISOString(),
        }));

    return <Security currSession={session} sessions={sessions} />
}
