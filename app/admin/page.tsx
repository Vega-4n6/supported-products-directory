import Link from "next/link";
import { products, manufacturers, categories } from "@/data/cms";
import { Icon } from "@/components/Icon";
import { ClickMonitor } from "@/components/ClickMonitor";

export default function AdminDashboard() {
  const published = products.length;
  const fullySupported = products.filter((p) => p.supportStatus === "Fully Supported").length;
  const beta = products.filter((p) => p.supportStatus === "Beta").length;
  const totalDownloads = products.reduce((s, p) => s + p.downloads.length, 0);

  const stats = [
    { label: "Products", value: published, sub: `${fullySupported} fully supported, ${beta} beta`, icon: "cpu", href: "/admin/products" },
    { label: "Manufacturers", value: manufacturers.length, sub: `${manufacturers.filter((m) => m.tier === "Gold").length} gold tier`, icon: "shield", href: "/admin/manufacturers" },
    { label: "Categories", value: categories.length, sub: "Across all product lines", icon: "list", href: "/admin/categories" },
    { label: "Downloadable files", value: totalDownloads, sub: "Datasheets, drivers, manuals", icon: "download", href: "/admin/downloads" },
  ] as const;

  const recent = [...products].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated)).slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">CMS Studio</p>
          <h1 className="mt-1 text-3xl font-bold text-primary tracking-tight">Dashboard</h1>
          <p className="mt-1 text-secondary">A preview of how your team will manage the directory.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products?new=1" className="btn-primary"><Icon name="check" className="w-4 h-4" /> New product</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-cta/10 text-cta">
                <Icon name={s.icon} />
              </span>
              <Icon name="arrow-right" className="w-4 h-4 text-secondary" />
            </div>
            <p className="mt-4 text-3xl font-extrabold text-primary tracking-tight">{s.value}</p>
            <p className="text-sm font-semibold text-primary">{s.label}</p>
            <p className="mt-1 text-xs text-secondary">{s.sub}</p>
          </Link>
        ))}
      </div>

      <ClickMonitor />

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
        {/* Recent updates */}
        <section className="card">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-bold text-primary">Recently updated</h2>
            <Link href="/admin/products" className="text-sm font-semibold text-cta cursor-pointer">View all</Link>
          </div>
          <ul className="divide-y divide-border">
            {recent.map((p) => (
              <li key={p.slug} className="flex items-center gap-4 px-5 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border font-bold text-primary bg-white">
                  {manufacturers.find((m) => m.slug === p.manufacturerSlug)?.logoMark}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-primary truncate">{p.name}</p>
                  <p className="text-xs text-secondary">SKU {p.sku} · Updated {new Date(p.lastUpdated).toLocaleDateString()}</p>
                </div>
                <span className={`chip !text-[11px] ${p.supportStatus === "Fully Supported" ? "!border-emerald-200 !bg-emerald-50 !text-emerald-700" : p.supportStatus === "Beta" ? "!border-amber-200 !bg-amber-50 !text-amber-700" : ""}`}>{p.supportStatus}</span>
                <Link href={`/admin/products?edit=${p.slug}`} className="text-sm font-semibold text-cta cursor-pointer">Edit</Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Collections shortcut */}
        <section className="card p-5">
          <h2 className="font-bold text-primary">Collections</h2>
          <p className="mt-1 text-sm text-secondary">These map 1:1 to Webflow CMS Collections on launch.</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { name: "Products", count: products.length, href: "/admin/products" },
              { name: "Manufacturers", count: manufacturers.length, href: "/admin/manufacturers" },
              { name: "Categories", count: categories.length, href: "/admin/categories" },
              { name: "Downloads (log)", count: 0, href: "/admin/downloads" },
            ].map((c) => (
              <li key={c.name}>
                <Link href={c.href} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 hover:border-cta hover:bg-cta/5 cursor-pointer">
                  <span className="font-medium text-primary">{c.name}</span>
                  <span className="text-xs text-secondary">{c.count} item{c.count === 1 ? "" : "s"} <Icon name="arrow-right" className="inline w-3.5 h-3.5 ml-1" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
