import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST() {
//   const session = await auth.api.getSession({
//     headers: headers(),
//   });
  console.log("hola")

//   await auth.api.deleteUser({
//     userId: session.user.id,
//   });

  return new Response(null, { status: 204 });
}
