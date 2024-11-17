"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  return (
    <h1 className="flex h-12 items-center justify-center font-bold uppercase">
      {path.replace("/", "")}
    </h1>
  );
}
