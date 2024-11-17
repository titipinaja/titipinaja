import { getListings } from "@/lib/db/listings";
import { getCurrentSession } from "@/lib/session";
import { toLocalDay } from "@/lib/utils";
import {
  Banknote,
  Calendar,
  CalendarCheck2,
  Globe2,
  Luggage,
  MapPin,
} from "lucide-react";
import AddListingButton from "./components/add-listing-button";
import DeleteListingButton from "./components/delete-listing-button";
import WhatsAppButton from "./components/whatsapp-button";

export default async function Page({
  searchParams,
}: {
  searchParams?: { login: string };
}) {
  const { user } = await getCurrentSession();
  const listings = await getListings();

  return (
    <div className="flex flex-col gap-y-4">
      {/** add listing button. */}
      <AddListingButton
        login={searchParams?.login === "successful" ? "successful" : "failed"}
      />

      {/** listings. */}
      {listings.length > 0 ? (
        listings.map((listing) => (
          <div
            key={listing.id}
            className="grid gap-y-4 rounded-md border bg-neutral-900 p-4 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Felix Arjuna</h3>
              {listing.userId === user?.id ? (
                <DeleteListingButton id={listing.id} />
              ) : null}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-y-4">
              <div className="col-span-1 flex flex-col gap-x-2 gap-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <p className="font-bold">{listing.from}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <p>{toLocalDay(listing.departureAt)}</p>
                </div>
              </div>

              <div className="col-span-1 flex flex-col gap-x-2 gap-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <p className="font-bold">{listing.to}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <p>{toLocalDay(listing.arriveAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <Luggage className="h-4 w-4" />
                <p>{listing.baggage} kg</p>
              </div>

              <div className="flex items-center gap-x-2">
                <Banknote className="h-4 w-4" />
                <p>{listing.price} €/kg</p>
              </div>

              <div>
                <div className="flex items-center gap-x-2 text-blue-400">
                  <p className="font-bold">Last receive</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <CalendarCheck2 className="h-4 w-4" />
                  <p>{toLocalDay(listing.lastReceiveAt)}</p>
                </div>
              </div>
            </div>

            <WhatsAppButton number={listing.user?.whatsappNumber} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center gap-x-2 rounded-md border border-dashed border-neutral-100 py-6">
          <Globe2 className="h-5 w-5" />
          <p className="text-sm">No listing available.</p>
        </div>
      )}
    </div>
  );
}
