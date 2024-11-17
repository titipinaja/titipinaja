"use server";

import { db } from "@/server/db";
import { listings } from "@/server/db/schema";
import { redirect } from "next/navigation";
import { createServerAction, ZSAError } from "zsa";
import { getCurrentSession } from "../session";
import { addListingSchema } from "./schema";

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
      arriveAt: input.departureAt.toISOString(),
      lastReceiveAt: input.lastReceiveAt.toISOString(),
      userId: user.id,
    });

    redirect("/explore");
  });
