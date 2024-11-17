import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "< titipin.aja />",
  description:
    "A place where we can help our peers and saving our planet at the same time.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="dark mx-auto min-h-screen w-11/12 bg-neutral-950 py-4 font-mono">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
