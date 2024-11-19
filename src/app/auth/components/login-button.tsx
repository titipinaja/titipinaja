"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type ILoginButtonProps = React.HTMLAttributes<HTMLDivElement>;

export default function LoginButton(props: ILoginButtonProps) {
  const router = useRouter();

  return (
    <Button
      className={cn(
        "flex w-fit items-center gap-x-1 bg-blue-400",
        props.className,
      )}
      onClick={async () => {
        router.push("/auth/login");
      }}
      size={"default"}
    >
      <LogIn className="h-4 w-4" />
      <p>Login</p>
    </Button>
  );
}
