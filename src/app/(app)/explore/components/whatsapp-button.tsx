"use client";

import { Button } from "@/components/ui/button";
import { RiWhatsappLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

export default function WhatsAppButton({
  number,
}: {
  number: string | null | undefined;
}) {
  const router = useRouter();

  return (
    <Button
      size={"sm"}
      variant={"ghost"}
      className="flex w-full items-center justify-center gap-x-2 rounded-md border border-green-400 px-2 py-1 text-green-400"
      onClick={() => {
        router.push(`https://wa.me/${number}`);
      }}
      disabled={!number}
    >
      <RiWhatsappLine className="h-5 w-5" />
      <p className="font-mono">{number ?? "unknown"}</p>
    </Button>
  );
}
