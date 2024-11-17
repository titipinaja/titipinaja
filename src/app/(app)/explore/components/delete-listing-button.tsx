"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteListing } from "@/lib/db/listings";
import { Loader2, Trash } from "lucide-react";
import { useServerAction } from "zsa-react";

export default function DeleteListingButton({ id }: { id: number }) {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(deleteListing, {
    onSuccess: () => {
      toast({
        title: "✅ Listing was deleted successfully.",
      });
    },
    onError: ({ err }) => {
      toast({
        title: `An error occured while deleting listing. Error: ${err.message}`,
        variant: "destructive",
      });
    },
  });

  return (
    <Button
      size={"icon"}
      variant={"destructive"}
      disabled={isPending}
      onClick={() => execute({ id })}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash className="h-4 w-4" />
      )}
    </Button>
  );
}
