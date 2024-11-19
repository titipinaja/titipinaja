import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getListings } from "@/lib/db/listings";
import { getCurrentSession } from "@/lib/session";
import { toLocalDay } from "@/lib/utils";
import {
  Banknote,
  Globe2,
  Handshake,
  Luggage,
  PlaneLanding,
  PlaneTakeoff,
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
            className="grid gap-y-4 rounded-md border bg-neutral-900 px-6 py-4 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">{listing.user?.name}</h3>
              {listing.userId === user?.id ? (
                <DeleteListingButton id={listing.id} />
              ) : null}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-y-4">
              <Badge className="col-span-2 w-fit bg-blue-400">
                Flight information
              </Badge>

              <div className="col-span-2 flex justify-between">
                <div className="col-span-1 flex flex-col gap-x-2 gap-y-1">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <PlaneTakeoff className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Flight from</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <p className="font-bold">{listing.from}</p>
                  </div>

                  <div className="ml-6 flex items-center gap-2">
                    <p>{toLocalDay(listing.departureAt)}</p>
                  </div>
                </div>

                <Separator orientation="vertical" className="bg-neutral-600" />

                <div className="col-span-1 flex flex-col gap-x-2 gap-y-1">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <PlaneLanding className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Flight to</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <p className="font-bold">{listing.to}</p>
                  </div>

                  <div className="ml-6 flex items-center gap-2">
                    <p>{toLocalDay(listing.arriveAt)}</p>
                  </div>
                </div>
              </div>

              <Badge className="col-span-2 w-fit bg-blue-400">
                Baggage information
              </Badge>

              <div className="col-span-2 grid grid-cols-2 gap-y-1">
                <div className="col-span-2 flex justify-between">
                  <div className="flex items-center gap-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Handshake className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Latest date to receive item</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p>{toLocalDay(listing.lastReceiveAt)}</p>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="bg-neutral-600"
                  />
                  <div className="flex items-center gap-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Luggage className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total available luggage</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p>{listing.baggage} kg</p>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="bg-neutral-600"
                  />
                  <div className="flex items-center gap-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Banknote className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Price in €/kg</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p>{listing.price} €</p>
                  </div>
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
