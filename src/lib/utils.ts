import { type ClassValue, clsx } from "clsx";
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** method to create initals from name. */
export function getInitials(name: string): string {
  const parts = name.split(" ");
  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

/** method to return local date. */
export function toLocalDay(date: string) {
  return DateTime.fromISO(date)
    .setZone("Europe/Berlin")
    .setLocale("id-ID")
    .toFormat("dd MMMM yyyy");
}
