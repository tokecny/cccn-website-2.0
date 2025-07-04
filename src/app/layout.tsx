import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./clientLayout";

export const metadata: Metadata = {
  title: {
    default: "CCCN Lab",
    template: "%s – CCCN Lab",
  },
  icons: {
    icon: "/favicon-rounded.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth font-sans text-black bg-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
