"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export function CmsPreviewPill() {
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || path?.startsWith("/admin")) return null;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Reopen CMS preview"
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-primary text-white shadow-[0_12px_32px_-8px_rgba(3,105,161,0.45)] hover:bg-cta cursor-pointer transition-colors"
      >
        <Icon name="sliders" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 left-5 sm:left-auto z-50 sm:max-w-sm">
      <div className="relative overflow-hidden rounded-2xl bg-primary text-white shadow-[0_24px_64px_-16px_rgba(15,23,42,0.45)] ring-1 ring-white/10">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 85% 15%, #0369A1 0, transparent 55%)" }} />
        <button
          onClick={() => setOpen(false)}
          aria-label="Dismiss"
          className="absolute top-3 right-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
        >
          <Icon name="x" className="w-4 h-4" />
        </button>

        <div className="relative p-5 pr-12">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-300">Prototype feature</p>
          </div>

          <p className="mt-2 text-lg font-bold leading-snug">Preview the CMS backend</p>
          <p className="mt-1 text-sm text-white/70 leading-relaxed">
            Fully editable mock of how your team will manage products on Webflow — no code.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <Link href="/admin" className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-primary hover:bg-slate-100 cursor-pointer">
              Open CMS Studio <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[11px] text-white/50">Live edits · in-browser</span>
          </div>
        </div>
      </div>
    </div>
  );
}
