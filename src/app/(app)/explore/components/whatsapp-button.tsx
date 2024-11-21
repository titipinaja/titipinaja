"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiWhatsappLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import React from "react";

interface IWhatsAppButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly number: string | null | undefined;
  readonly isExpired: boolean;
}

export default function WhatsAppButton({
  number,
  className,
  isExpired,
}: IWhatsAppButtonProps) {
  const router = useRouter();

  return (
    <Button
      size={"sm"}
      variant={"default"}
      className={cn(
        "py-1t flex w-full items-center justify-center gap-x-1 rounded-md border bg-blue-400 px-2 text-neutral-900 hover:bg-blue-400/80",
        className,
      )}
      onClick={() => {
        router.push(`https://wa.me/${number}`);
      }}
      disabled={!number || isExpired}
    >
      <RiWhatsappLine className="h-5 w-5" />
      <p className="font-mono">Contact</p>
    </Button>
  );
}
