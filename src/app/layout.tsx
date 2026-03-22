import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1NTENT - Personality-Based Matchmaking",
  description:
    "We match you with the right person based on who you actually are. Take a short personality test and we\u2019ll find someone who truly complements you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
