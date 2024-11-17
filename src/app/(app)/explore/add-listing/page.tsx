import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session } = await getCurrentSession();

  if (session === null) redirect("/auth/login");
}
