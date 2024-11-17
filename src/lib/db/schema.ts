import { z } from "zod";

export const addListingSchema = z
  .object({
    baggage: z.coerce.number().min(1),
    price: z.coerce.number().min(1),
    from: z.string().min(1, "Please enter a valid city name."),
    to: z.string().min(1, "Please enter a valid city name."),
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

export const deleteListingSchema = z.object({ id: z.number() });

export const updateWhatsappNumberSchema = z.object({
  userId: z.string(),
  whatsappNumber: z
    .string()
    .regex(
      /^(\+|00)?[1-9]\d{0,3}[\s.-]?\(?[1-9]\d{0,3}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/,
      "Invalid phone number format",
    ),
});
