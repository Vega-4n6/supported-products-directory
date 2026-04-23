"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { CmsPreviewPill } from "./CmsPreviewPill";
import { AiAssistant } from "./AiAssistant";

export function SiteHeader() {
  const path = usePathname();
  if (path?.startsWith("/admin")) return null;
  return <Header />;
}

export function SiteFooter() {
  const path = usePathname();
  if (path?.startsWith("/admin")) return null;
  return (
    <>
      <Footer />
      <AiAssistant />
      <CmsPreviewPill />
    </>
  );
}
