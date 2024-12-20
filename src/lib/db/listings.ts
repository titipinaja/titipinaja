"use server";

import { db } from "@/server/db";
import { listings } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerAction, ZSAError } from "zsa";
import { getCurrentSession } from "../session";
import { addListingSchema, deleteListingSchema } from "./schema";

export const getListings = async () => {
  const listings = await db.query.listings.findMany({ with: { user: true } });
  return listings;
};

export const addListing = createServerAction()
  .input(addListingSchema)
  .handler(async ({ input }) => {
    const { user } = await getCurrentSession();
    if (user === null)
      throw new ZSAError(
        "NOT_AUTHORIZED",
        "An error occured while adding listing. Please kindly login first!",
      );

    await db.insert(listings).values({
      ...input,
      departureAt: input.departureAt.toISOString(),
      arriveAt: input.arriveAt.toISOString(),
      lastReceiveAt: input.lastReceiveAt.toISOString(),
      userId: user.id,
    });

    redirect("/explore");
  });

export const deleteListing = createServerAction()
  .input(deleteListingSchema)
  .handler(async ({ input }) => {
    await db.delete(listings).where(eq(listings.id, input.id));

    revalidatePath("/explore");
  });
