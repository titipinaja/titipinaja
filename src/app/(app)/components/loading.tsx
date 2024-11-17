import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ILoadingProps = React.HTMLAttributes<HTMLDivElement>;

export default function Loading(props: ILoadingProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      <p className={cn("text-sm", props.className)}>Loading</p>
    </div>
  );
}
