import BackButton from "@/app/auth/components/back-button";
import LoginButton from "@/app/auth/components/login-button";
import LogoutButton from "@/app/auth/components/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentSession } from "@/lib/session";
import { getInitials } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { redirect } from "next/navigation";
import UpdateWhatsAppForm from "../components/update-whatsapp-form";

export default async function Account() {
  const { user } = await getCurrentSession();

  if (user === null) {
    redirect("/auth/login");
  }

  return (
    <div>
      <div className="flex flex-col gap-y-8 pb-4">
        <div className="flex justify-between">
          <BackButton />
          <div className="flex flex-row items-center justify-end">
            {user === null ? <LoginButton /> : <LogoutButton />}
          </div>
        </div>

        <div className="flex flex-col gap-4 text-left">
          {user.whatsappNumber === null ? (
            <div className="flex items-center gap-x-2 rounded-md border bg-yellow-400 px-4 py-3 text-neutral-900">
              <TriangleAlert className="w-16" />
              <p className="font-mono text-xs">
                You haven&apos;t provided your WhatsApp number. Please provide a
                valid WhatsApp number so that people could contact you.
              </p>
            </div>
          ) : null}

          <div className="flex justify-center">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.picture ?? undefined} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm">Name</Label>
            <Input
              type="name"
              defaultValue={user.name}
              className="font-mono text-xs dark:border-neutral-100"
              autoComplete="email"
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              defaultValue={user?.email}
              className="font-mono text-xs dark:border-neutral-100"
              autoComplete="email"
              disabled
            />
          </div>

          <UpdateWhatsAppForm
            userId={user.id}
            whatsappNumber={user.whatsappNumber}
          />
        </div>
      </div>
    </div>
  );
}
