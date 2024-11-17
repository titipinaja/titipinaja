"use client";

import { logOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { toast } = useToast();

  return (
    <Button
      className="flex w-fit gap-1 self-end bg-blue-400"
      onClick={async () => {
        const { success } = await logOut();
        if (success) toast({ title: "Logout successful." });
      }}
      size={"default"}
    >
      <LogOut className="h-4 w-4" />
      <p>Logout</p>
    </Button>
  );
}
