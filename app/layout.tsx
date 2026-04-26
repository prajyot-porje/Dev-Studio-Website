import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Dev Studio — Web Development & Digital Presence Agency",
  description:
    "We build fast, modern websites, integrate AI into products, and manage digital presence for businesses across the US, India, and beyond. Based in Pune, working globally.",
  keywords: ["web development", "AI integration", "digital presence", "Next.js", "Dev Studio", "Pune"],
  openGraph: {
    title: "Dev Studio — Web Development & Digital Presence Agency",
    description: "Fast websites, AI integrations, and digital presence management for growing businesses.",
    type: "website",
  },
  verification: {
    google: "AZFesV-GGIPjkLX88TjkmcHifsZlcLDSfJQ9vPsE3O0",
  },
};

import { LoadingProvider } from "@/components/LoadingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", poppins.variable, inter.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KFH89H3Z');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
               (function() {
                 var t = localStorage.getItem('devstudio-theme');
                 if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                 document.documentElement.setAttribute('data-theme', t);
               })();
             `,
          }}
        />
      </head>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KFH89H3Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider>
          <SmoothScroll>
            <LoadingProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </LoadingProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
