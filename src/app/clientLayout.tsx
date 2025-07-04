"use client";

import Navbar from "@/components/navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">{children}</main>
      <footer className="border-t text-sm text-gray-500 text-center py-6">
        <p>
          &copy; {new Date().getFullYear()} CCCN Lab. All rights reserved.
        </p>
      </footer>
    </>
  );
}
