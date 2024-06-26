import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/src/utils/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <main className="flex h-full flex-col items-center justify-between p-6">
            {children}
        </main>
  );
}
