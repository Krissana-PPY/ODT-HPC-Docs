import type { Metadata } from "next";
import "../styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "HPC Cluster - คู่มือการใช้งาน | มหาวิทยาลัยขอนแก่น",
  description:
    "คู่มือการใช้งาน HPC (High-Performance Computing) Cluster มหาวิทยาลัยขอนแก่น เวอร์ชัน 1.1 Testbeta",
  keywords: "HPC, Cluster, KKU, Khon Kaen University, Slurm, GPU, Computing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {/* Static Navbar - follows user when scrolling */}
        <Navbar />

        <div className="flex pt-16">
          {/* Static Sidebar */}
          <Sidebar />

          {/* Main content area */}
          <main className="flex-1 ml-0 lg:ml-72 min-h-[calc(100vh-4rem)]">
            <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
