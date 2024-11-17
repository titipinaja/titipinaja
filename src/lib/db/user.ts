"use server";

import { type ClaimSchema } from "@/app/api/auth/google/callback/route";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";
import { updateWhatsappNumberSchema } from "./schema";

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

/** method to update user whatsapp number. */
export const updateWhatsappNumber = createServerAction()
  .input(updateWhatsappNumberSchema)
  .handler(async ({ input }) => {
    await db
      .update(users)
      .set({ whatsappNumber: input.whatsappNumber })
      .where(eq(users.id, input.userId));

    revalidatePath("/explore");
  });
