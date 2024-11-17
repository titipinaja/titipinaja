import { getListings } from "@/lib/db/listings";
import { Globe2 } from "lucide-react";
import AddListingButton from "./components/add-listing-button";

export default async function Page({
  searchParams,
}: {
  searchParams?: { login: string };
}) {
  const listings = await getListings();

  return (
    <div className="flex flex-col gap-y-4">
      {/** add listing button. */}
      <AddListingButton
        login={searchParams?.login === "successful" ? "successful" : "failed"}
      />

      {/** listings. */}
      {listings.length > 0 ? (
        listings.map((listing) => <div key={listing.id}>{listing.baggage}</div>)
      ) : (
        <div className="flex items-center justify-center gap-x-2 rounded-md border border-dashed border-neutral-100 py-6">
          <Globe2 className="h-5 w-5" />
          <p className="text-sm">No listing available.</p>
        </div>
      )}
    </div>
  );
}
