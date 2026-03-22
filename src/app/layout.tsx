import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1NTENT - Мачмейкинг, базиран на личността",
  description:
    "Свързваме те с правилния човек, базирайки се на това кой наистина си. Попълни кратък тест за личността и ние ще намерим някой, който наистина те допълва.",
  metadataBase: new URL("https://1ntent.vercel.app"),
  openGraph: {
    title: "1NTENT - Намираме човека, който ти подхожда",
    description:
      "Попълни кратък тест за личността и ние ще те свържем с някой, който наистина те допълва.",
    siteName: "1NTENT",
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1NTENT - Намираме човека, който ти подхожда",
    description:
      "Мачмейкинг, базиран на личността. Попълни теста и намери своето съвпадение.",
  },
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
        {/* Plausible Analytics */}
        <script
          async
          src="https://plausible.io/js/pa-prdw7niarsWGpBXuFH-mM.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
