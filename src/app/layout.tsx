import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindMatch - Find Your Perfect Match Through Science",
  description:
    "Take our personality test and get matched with compatible people based on psychological compatibility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
