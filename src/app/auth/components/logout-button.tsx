"use client";

import { logOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      className="mx-4 flex w-fit gap-1 self-end bg-purple-400"
      onClick={() => logOut()}
      size={"sm"}
    >
      <LogOut className="h-4 w-4" />
      <p>Logout</p>
    </Button>
  );
}
