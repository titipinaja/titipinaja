import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AddListingForm from "./components/add-listing-form";

export default async function Page() {
  const { session } = await getCurrentSession();

  if (session === null) redirect("/auth/login");

  return (
    <div className="grid gap-4">
      <AddListingForm />
    </div>
  );
}
