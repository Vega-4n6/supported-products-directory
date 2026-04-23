"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icon";

const nav = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Directory" },
  { href: "/why-supported", label: "Why Supported Matters" },
  { href: "/get-supported", label: "Get Your Product Supported" },
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-primary cursor-pointer">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white">
            <Icon name="shield" className="w-5 h-5" />
          </span>
          <span className="text-[15px] tracking-tight">Supported<span className="text-cta">.</span>Products</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = path === n.href || (n.href !== "/" && path.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  active ? "text-cta" : "text-secondary hover:text-primary"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/directory" className="btn-secondary !py-2 !px-3 text-xs">
            <Icon name="search" className="w-4 h-4" /> Search catalog
          </Link>
          <Link href="/get-supported" className="btn-primary !py-2 !px-3 text-xs">
            Get supported <Icon name="arrow-right" className="w-4 h-4" />
          </Link>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
          className="md:hidden grid h-10 w-10 place-items-center rounded-lg border border-border cursor-pointer"
        >
          <Icon name={open ? "x" : "menu"} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container-x py-3 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-primary hover:bg-slate-50 cursor-pointer"
              >
                {n.label}
              </Link>
            ))}
            <Link href="/get-supported" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Get supported <Icon name="arrow-right" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
