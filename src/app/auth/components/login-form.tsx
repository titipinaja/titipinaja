"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiGoogleFill } from "@remixicon/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  return (
    <Card className="mx-auto sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-lg">Login</CardTitle>
        <CardDescription>
          Currently only support google authentication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/api/auth/google")}
          >
            <RiGoogleFill className="col-span-1 h-4 w-4 place-self-center" />
            <p>Continue with Google</p>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
