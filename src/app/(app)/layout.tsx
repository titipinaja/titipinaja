import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { getCurrentSession } from "@/lib/session";
import { CircleCheck, Globe2, TriangleAlert, User } from "lucide-react";
import { type Viewport } from "next";
import Link from "next/link";
import Header from "./components/header";

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
          <Link
            className="relative flex flex-col items-center"
            href={"/account"}
          >
            <User className="h-5 w-5" />
            <p className="text-xs">account</p>
            {user === null ? null : user?.whatsappNumber === null ? (
              <TriangleAlert className="absolute -top-1 right-0 h-4 w-4 text-yellow-500" />
            ) : (
              <CircleCheck className="absolute -top-1 right-0 h-4 w-4 text-green-500" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
