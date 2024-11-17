"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function AddListingButton({
  login,
}: {
  login: "successful" | "failed";
}) {
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    if (login === "successful") toast({ title: "✅ Login successful." });
  }, [login, toast]);

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
