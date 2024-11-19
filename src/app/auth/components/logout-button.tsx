"use client";

import { logOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

type ILogoutButtonProps = React.HTMLAttributes<HTMLDivElement>;

export default function LogoutButton(props: ILogoutButtonProps) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <Button
      className={cn("flex w-fit items-center gap-1", props.className)}
      onClick={async () => {
        const { success } = await logOut();
        if (success) toast({ title: "Logout successful." });
        router.push("/explore");
      }}
      size={"default"}
      variant={"destructive"}
    >
      <LogOut className="h-4 w-4" />
      <p>Logout</p>
    </Button>
  );
}
