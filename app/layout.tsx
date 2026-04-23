import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/Chrome";

export const metadata: Metadata = {
  title: "Supported Products Directory — CMS-first AV catalog",
  description:
    "The authoritative directory of AV products officially supported by our integration platform. Browse 25 manufacturers and 50+ products with drivers, datasheets, and compatibility guides.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
