import LogoutButton from "@/app/auth/components/logout-button";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentSession } from "@/lib/session";
import { getInitials } from "@/lib/utils";
import {
  CircleCheck,
  Globe2,
  Info,
  TriangleAlert,
  User,
  X,
} from "lucide-react";
import { type Viewport } from "next";
import Link from "next/link";
import LoginButton from "../auth/components/login-button";
import Header from "./components/header";
import UpdateWhatsAppForm from "./components/update-whatsapp-form";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await getCurrentSession();

  return (
    <div className="text-sm">
      {/** page header. */}
      <Header />
      <Separator className="dark:bg-neutral-100" />

      {/** page content. */}
      <div className="py-4">{children}</div>

      {/** navigation. */}
      <div className="fixed bottom-0 left-0 grid h-16 w-full grid-cols-3 items-center rounded-t-lg bg-neutral-100 text-neutral-900">
        <Link
          className="col-span-1 flex items-center justify-center"
          href={"/contributions"}
        >
          <div className="flex flex-col items-center">
            <Globe2 className="h-5 w-5" />
            <p className="text-xs">contributions</p>
          </div>
        </Link>
        <Link
          href={"/explore"}
          className="bg-black-20 col-span-1 flex h-full flex-col items-center justify-center gap-y-[2px]"
        >
          <p className="flex text-sm font-extrabold tracking-tighter dark:text-neutral-800">
            {"< titipin.aja />"}
          </p>
          <Badge className="flex h-fit gap-1 bg-blue-400 py-0 text-xs font-normal lowercase hover:bg-blue-500">
            explore
          </Badge>
        </Link>
        <div className="col-span-1 flex items-center justify-center">
          <Drawer>
            <DrawerTrigger className="relative flex flex-col items-center">
              <User className="h-5 w-5" />
              <p className="text-xs">account</p>
              {user?.whatsappNumber === null ? (
                <TriangleAlert className="absolute -top-1 right-0 h-4 w-4 text-yellow-500" />
              ) : (
                <CircleCheck className="absolute -top-1 right-0 h-4 w-4 text-green-500" />
              )}
            </DrawerTrigger>
            <DrawerContent className="px-8" aria-describedby="user-information">
              <DrawerHeader className="flex flex-col gap-y-8 pb-20">
                <DrawerTitle>User Information</DrawerTitle>
                <DrawerDescription className="hidden" />

                {user !== null ? (
                  <div className="flex flex-col gap-4 text-left">
                    <div className="flex items-center gap-x-2 rounded-md border border-blue-400 px-4 py-3 text-blue-300">
                      <Info className="w-16" />
                      <p className="font-mono text-xs">
                        You haven&apos;t provided your WhatsApp number. Please
                        complete it, so that people could contact you from your
                        available listing.
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user?.picture ?? undefined} />
                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
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
                ) : (
                  <div>
                    <p className="font-mono text-sm">
                      No user information found. Please kindly login.
                    </p>
                  </div>
                )}
              </DrawerHeader>

              <DrawerFooter className="flex flex-row items-center justify-center">
                <DrawerClose
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
                  <X className="h-4 w-4" />
                  <p>Close</p>
                </DrawerClose>

                {user === null ? <LoginButton /> : <LogoutButton />}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
