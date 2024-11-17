import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getListings } from "./actions";

export default async function Explore() {
  const listings = await getListings();

  return (
    <div className="flex flex-col">
      {/** add listing button. */}
      <Button size={"icon"} className="flex items-center gap-x-2 self-end">
        <Plus />
      </Button>

      {/** listings. */}
      {listings.map((listing) => (
        <div key={listing.id}>{listing.baggage}</div>
      ))}
    </div>
  );
}
