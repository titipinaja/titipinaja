ALTER TABLE "titipinaja_listing" ALTER COLUMN "baggage" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "titipinaja_listing" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "titipinaja_listing" ALTER COLUMN "last_receive_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "titipinaja_listing" ALTER COLUMN "departure_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "titipinaja_listing" ALTER COLUMN "arrive_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "titipinaja_user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "titipinaja_listing" ADD COLUMN "from" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "titipinaja_listing" ADD COLUMN "to" varchar NOT NULL;