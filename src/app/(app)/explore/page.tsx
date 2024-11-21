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
import { cn, toLocalDay } from "@/lib/utils";
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
    <div className="flex flex-col gap-y-4 pb-16 font-sans">
      {/** add listing button. */}
      <AddListingButton
        login={searchParams?.login === "successful" ? "successful" : "failed"}
      />

      {/** listings. */}
      {listings.length > 0 ? (
        <div className={"grid gap-4 md:grid-cols-5"}>
          {listings.map((listing) => {
            const isExpired = new Date(listing.lastReceiveAt) < new Date();

            return (
              <div
                key={listing.id}
                className={cn(
                  "grid gap-y-4 rounded-md border px-4 py-4 text-xs",
                  {
                    "bg-neutral-600 opacity-50": isExpired,
                  },
                )}
              >
                <div className={"flex items-center justify-between"}>
                  <h3 className="text-sm font-bold">{listing.user?.name}</h3>

                  <div className="flex items-center gap-x-2">
                    <Badge
                      className={cn("font-mono", {
                        "bg-green-400": listing.status === "available",
                        "bg-red-400": listing.status === "fully_booked",
                        "bg-neutral-200": isExpired,
                      })}
                    >
                      {isExpired
                        ? "expired"
                        : listing.status === "fully_booked"
                          ? "booked out"
                          : listing.status}
                    </Badge>

                    {listing.userId === user?.id ? (
                      <DeleteListingButton id={listing.id} />
                    ) : null}
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-y-4">
                  <Badge className="col-span-2 w-fit bg-blue-400 font-mono hover:bg-blue-400/80">
                    Flight
                  </Badge>

                  <div className="col-span-2 flex">
                    <div className="flex w-1/2 flex-col gap-x-2 gap-y-1">
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

                    <Separator
                      orientation="vertical"
                      className="mx-4 bg-neutral-600"
                    />

                    <div className="flex w-1/2 flex-col gap-x-2 gap-y-1">
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

                  <Badge className="col-span-2 w-fit bg-blue-400 font-mono hover:bg-blue-400/80">
                    Baggage
                  </Badge>

                  <div className="col-span-2 flex flex-col gap-2">
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
                      orientation="horizontal"
                      className="bg-neutral-600"
                    />

                    <div className="flex items-center">
                      <div className="col-span-1 flex w-1/2 items-center justify-start gap-x-2">
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
                      <div className="col-span-1 ml-4 flex w-1/3 items-center gap-x-2">
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

                <WhatsAppButton
                  number={listing.user?.whatsappNumber}
                  isExpired={isExpired}
                  className="mt-2"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-x-2 rounded-md border border-dashed border-neutral-100 py-6">
          <Globe2 className="h-5 w-5" />
          <p className="text-sm">No listing available.</p>
        </div>
      )}
    </div>
  );
}
