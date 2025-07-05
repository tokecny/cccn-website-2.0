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
      <main className="">{children}</main>
      <footer className="border-t text-sm text-gray-500 text-center py-6">
        <p>
          {year} CCCN Lab. All rights reserved.
        </p>
      </footer>
    </>
  );
}
