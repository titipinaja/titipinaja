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
import { Globe2, User, X } from "lucide-react";
import Link from "next/link";
import Header from "./components/header";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const user = await getUser();

  return (
    <div>
      {/** page header. */}
      <Header />
      <Separator className="dark:bg-neutral-200" />

      {/** page content. */}
      <div>{children}</div>

      {/** navigation. */}
      <div className="fixed bottom-0 left-0 grid h-16 w-full grid-cols-3 items-center rounded-t-lg bg-neutral-200/80 text-neutral-900">
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
          <Badge className="flex h-fit gap-1 bg-purple-400 py-0 text-xs font-normal lowercase hover:bg-purple-500">
            Home
          </Badge>
        </Link>
        <div className="col-span-1 flex items-center justify-center">
          <Drawer>
            <DrawerTrigger className="flex flex-col items-center">
              <User className="h-5 w-5" />
              <p className="text-xs">account</p>
            </DrawerTrigger>
            <DrawerContent className="px-8" aria-describedby="user-information">
              <DrawerHeader className="flex flex-col gap-y-8">
                <DrawerTitle>User Information</DrawerTitle>
                <DrawerDescription className="hidden" />
                <div className="flex flex-col gap-2 text-left">
                  <div className="flex justify-center">
                    {/* <Avatar className="h-12 w-12">
                      <AvatarImage src={user?.picture} />
                      <AvatarFallback>
                        {getInitials(user?.name ?? "")}
                      </AvatarFallback>
                    </Avatar> */}
                  </div>

                  {/* <div>
                    <Label>Name</Label>
                    <Input
                      type="name"
                      defaultValue={user?.name}
                      className="dark:border-neutral-100"
                      autoComplete="email"
                      disabled
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      defaultValue={user?.email}
                      className="dark:border-neutral-100"
                      autoComplete="email"
                      disabled
                    />
                  </div> */}
                </div>
              </DrawerHeader>

              <LogoutButton />

              <DrawerFooter>
                <DrawerClose
                  className={buttonVariants({
                    size: "icon",
                    variant: "outline",
                  })}
                >
                  <X className="h-4 w-4" />
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
