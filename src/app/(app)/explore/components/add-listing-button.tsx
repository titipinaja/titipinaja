"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddListingButton({
  login,
}: {
  login: "successful" | "failed";
}) {
  const router = useRouter();
  const { toast } = useToast();

  if (login === "successful") toast({ title: "✅ Login successful." });

  return (
    <Button
      className={"flex items-center gap-x-2 self-end"}
      onClick={() => router.push("/explore/add-listing")}
      size={"icon"}
    >
      <Plus />
    </Button>
  );
}
