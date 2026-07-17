import type { Metadata } from "next";
import "../styles/globals.css";
import { LayoutClient } from "@/components/LayoutClient";

export const metadata: Metadata = {
  title: "HPC Cluster - คู่มือการใช้งาน | มหาวิทยาลัยขอนแก่น",
  description:
    "คู่มือการใช้งาน HPC (High-Performance Computing) Cluster มหาวิทยาลัยขอนแก่น เวอร์ชัน 1.3 Test beta",
  keywords: "HPC, Cluster, KKU, Khon Kaen University, Slurm, GPU, Computing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased" suppressHydrationWarning>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
