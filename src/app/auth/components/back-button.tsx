"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type IBackButtonProps = React.HTMLAttributes<HTMLDivElement>;

export default function BackButton(props: IBackButtonProps) {
  const router = useRouter();

  return (
    <Button
      className={cn("flex items-center gap-x-1 self-end", props.className)}
      size={"icon"}
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}
