import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1NTENT - Мачмейкинг, базиран на личността",
  description:
    "Свързваме те с правилния човек, базирайки се на това кой наистина си. Попълни кратък тест за личността и ние ще намерим някой, който наистина те допълва.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
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
