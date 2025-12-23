import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const client = new MongoClient(process.env.MONGODB_URL);
await client.connect();
export const db = client.db(process.env.DATABASE);

export const auth = betterAuth({
    database: mongodbAdapter(db),
    user: {
        changeEmail: {
            enabled: true,
            updateEmailWithoutVerification: true
        }
    },
    emailAndPassword: {
        enabled: true,
    },
});