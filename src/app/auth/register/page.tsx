"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signUp } from "../actions";

export const signUpSchema = z
  .object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const res = await signUp(values);
    if (res.success) {
      toast.success("Sign up successful");
      router.push("/collections");
    } else toast.error(res.error);
  }

  return (
    <div className="space-y-8 p-8">
      <div
        onClick={() => router.back()}
        className="mt-4 flex h-5 w-5 items-center justify-center rounded-lg border-[1px] border-neutral-200"
      >
        <ArrowLeft className="h-3 w-3" />
      </div>
      <Card className="m-0 space-y-4 border-0">
        <CardHeader className="p-0">
          <CardTitle>Begin your journey!</CardTitle>
          <CardDescription>Explore.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-100"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-100"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-100"
                        type="password"
                        placeholder="Password"
                        {...field}
                        autoComplete="new-password"
                        onChange={(e) => {
                          e.target.value = e.target.value.trim();
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-100"
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        {...field}
                        onChange={(e) => {
                          e.target.value = e.target.value.trim();
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-2 text-center text-sm">
        <p>Already have an account?</p>
        <Link href={"/auth/sign-in"} className="font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
