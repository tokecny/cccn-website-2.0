import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./clientLayout";

export const metadata: Metadata = {
  title: {
    default: "CCCN Lab",
    template: "%s – CCCN Lab",
  },
  description: "Curiosity. Critical Thinking. Creativity. Nerds!",
  icons: {
    icon: "/favicon-rounded.ico",
  },
  openGraph: {
    title: "CCCN Lab",
    description: "Curiosity. Critical Thinking. Creativity. Nerds!",
    url: "https://cccn-website-20.vercel.app",
    siteName: "CCCN Lab",
    images: [
      {
        url: "https://cccn-website-20.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "CCCN Lab",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CCCN Lab",
    description: "Curiosity. Critical Thinking. Creativity. Nerds!",
    images: ["https://cccn-website-20.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=ads_click"
        />
      </head>
      <body className="scroll-smooth font-sans text-black bg-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
