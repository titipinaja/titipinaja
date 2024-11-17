"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  return (
    <Button
      className="flex w-fit gap-1 self-end bg-blue-400"
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
