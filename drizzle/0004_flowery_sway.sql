ALTER TABLE "titipinaja_listing" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "titipinaja_listing" ADD CONSTRAINT "titipinaja_listing_user_id_titipinaja_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."titipinaja_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
