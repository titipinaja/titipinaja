import { type ClaimSchema } from "@/app/auth/login/google/callback/route";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

/** method to get user from email. */
export async function getUserFromEmail(email: string) {
  return await db.query.users.findFirst({ where: eq(users.email, email) });
}

/** method to create user. */
export async function createUser(claim: ClaimSchema) {
  return await db
    .insert(users)
    .values({
      name: claim.name,
      email: claim.email,
      picture: claim.picture,
    })
    .returning();
}
