"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icon";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/products", label: "Products", icon: "cpu" },
  { href: "/admin/manufacturers", label: "Manufacturers", icon: "shield" },
  { href: "/admin/categories", label: "Categories", icon: "list" },
  { href: "/admin/downloads", label: "Download log", icon: "download" },
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary text-white transform transition-transform lg:transform-none ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex h-16 items-center gap-2.5 px-5 border-b border-white/10">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-cta text-white">
              <Icon name="shield" className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm font-bold">CMS Studio</p>
              <p className="text-[11px] text-white/60">Webflow-style backend</p>
            </div>
          </div>

          <nav className="p-3 space-y-0.5">
            {nav.map((n) => {
              const active = n.href === "/admin" ? path === n.href : path.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer transition-colors ${
                    active ? "bg-cta text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon name={n.icon} className="w-4 h-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <Link href="/" className="flex items-center gap-2 text-xs text-white/60 hover:text-white cursor-pointer">
              <Icon name="arrow-right" className="w-3.5 h-3.5 rotate-180" /> Back to site
            </Link>
          </div>
        </aside>

        {open && <div className="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setOpen(false)} />}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Topbar */}
          <header className="sticky top-0 z-20 h-16 border-b border-border bg-white flex items-center gap-3 px-5">
            <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="lg:hidden grid h-10 w-10 place-items-center rounded-lg border border-border cursor-pointer">
              <Icon name="menu" />
            </button>
            <div className="relative flex-1 max-w-md">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input placeholder="Search collections, items…" className="input !py-2 !pl-9 !text-sm" />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden sm:inline-flex chip !border-emerald-200 !bg-emerald-50 !text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live</span>
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-cta text-white text-xs font-bold">HA</div>
                <div className="hidden md:block">
                  <p className="text-xs font-semibold text-primary leading-tight">Haider Ali</p>
                  <p className="text-[11px] text-secondary leading-tight">Editor</p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-5 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
