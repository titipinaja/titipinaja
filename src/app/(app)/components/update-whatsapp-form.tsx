"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { updateWhatsappNumberSchema } from "@/lib/db/schema";
import { updateWhatsappNumber } from "@/lib/db/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useServerAction } from "zsa-react";
import Loading from "./loading";

export default function UpdateWhatsAppForm({
  userId,
  whatsappNumber,
}: {
  userId: string;
  whatsappNumber: string | null;
}) {
  const { toast } = useToast();
  const { isPending, execute } = useServerAction(updateWhatsappNumber, {
    onSuccess: () => {
      toast({
        title: "✅ Whatsapp number was updated successfully.",
      });
    },
    onError: ({ err }) => {
      toast({
        title: `An error occured while updating whatsapp number. Error: ${err.message}`,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof updateWhatsappNumberSchema>>({
    resolver: zodResolver(updateWhatsappNumberSchema),
    defaultValues: {
      userId: userId,
    },
  });

  function onSubmit(values: z.infer<typeof updateWhatsappNumberSchema>) {
    void execute({ userId, whatsappNumber: values.whatsappNumber });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <Label>WhatsApp</Label>
              <FormControl>
                <Input
                  defaultValue={whatsappNumber ?? undefined}
                  className="font-mono text-xs dark:border-neutral-100"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"> {isPending ? <Loading /> : "Submit"} </Button>
      </form>
    </Form>
  );
}
