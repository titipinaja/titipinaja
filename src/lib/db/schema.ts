import { z } from "zod";

export const addListingSchema = z
  .object({
    baggage: z.coerce.number().min(1),
    price: z.coerce.number().min(1),
    lastReceiveAt: z.date(),
    departureAt: z.date(),
    arriveAt: z.date(),
    termsAndConditions: z.string(),
  })
  .refine(
    (data) => {
      return data.arriveAt > data.departureAt;
    },
    {
      message: "Arrival date must be after departure date",
      path: ["arriveAt"],
    },
  )
  .refine(
    (data) => {
      return data.lastReceiveAt < data.departureAt;
    },
    {
      message: "Last receive date must be before departure date",
      path: ["lastReceiveAt"],
    },
  );
