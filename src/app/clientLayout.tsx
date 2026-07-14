"use client";

import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <Navbar />

      <main className="z-0">
        {children}
      </main>

      <footer className="border-t py-6 text-center text-sm text-gray-500">
        <p className="pb-14 lg:pb-0">
          {year} CCCN Lab. All rights reserved.
        </p>
      </footer>
    </>
  );
}