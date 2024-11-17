import { db } from "@/server/db";

export const getListings = async () => {
  const listings = await db.query.listings.findMany();
  return listings;
};
