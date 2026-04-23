"use client";
import { useMemo, useState } from "react";
import { products, manufacturers, categories, protocols } from "@/data/cms";
import ProductCard from "@/components/ProductCard";
import { Icon } from "@/components/Icon";

type Sort = "featured" | "newest" | "name";

export default function DirectoryPage() {
  const [q, setQ] = useState("");
  const [mfrs, setMfrs] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [protos, setProtos] = useState<string[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (mfrs.length && !mfrs.includes(p.manufacturerSlug)) return false;
      if (cats.length && !cats.includes(p.categorySlug)) return false;
      if (protos.length && !protos.some((x) => p.protocols.includes(x))) return false;
      if (q) {
        const h = `${p.name} ${p.sku} ${p.shortDescription} ${p.manufacturerSlug}`.toLowerCase();
        if (!h.includes(q.toLowerCase())) return false;
      }
      return true;
    });
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "newest") list = [...list].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
    else list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [q, mfrs, cats, protos, sort]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clearAll = () => { setMfrs([]); setCats([]); setProtos([]); setQ(""); };
  const activeCount = mfrs.length + cats.length + protos.length;

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="container-x py-10">
          <p className="text-sm text-secondary">Directory</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-bold text-primary tracking-tight">Supported products</h1>
          <p className="mt-2 text-secondary max-w-2xl">Browse every manufacturer, category, and protocol we officially support.</p>

          <div className="mt-6 relative max-w-xl">
            <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, SKU, manufacturer…"
              className="input !pl-11 !py-3.5"
            />
          </div>
        </div>
      </section>

      <section className="container-x py-8 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Mobile filter trigger */}
        <div className="lg:hidden flex items-center justify-between">
          <button onClick={() => setFiltersOpen(true)} className="btn-secondary">
            <Icon name="filter" className="w-4 h-4" /> Filters {activeCount ? <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cta px-1.5 text-[11px] font-bold text-white">{activeCount}</span> : null}
          </button>
          <span className="text-sm text-secondary">{filtered.length} results</span>
        </div>

        {/* Sidebar */}
        <aside className={`${filtersOpen ? "fixed inset-0 z-50 bg-white overflow-auto p-6" : "hidden"} lg:static lg:block lg:p-0`}>
          <div className="flex items-center justify-between mb-5 lg:hidden">
            <h2 className="text-lg font-bold">Filters</h2>
            <button onClick={() => setFiltersOpen(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-lg border border-border cursor-pointer">
              <Icon name="x" />
            </button>
          </div>

          <div className="hidden lg:flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider">Filters</h2>
            {activeCount > 0 && (
              <button onClick={clearAll} className="text-xs font-semibold text-cta cursor-pointer">Clear all</button>
            )}
          </div>

          <FilterGroup title="Manufacturer">
            {manufacturers.map((m) => (
              <Checkbox key={m.slug} label={m.name} count={m.productCount} checked={mfrs.includes(m.slug)} onChange={() => toggle(mfrs, setMfrs, m.slug)} />
            ))}
          </FilterGroup>

          <FilterGroup title="Category">
            {categories.map((c) => (
              <Checkbox key={c.slug} label={c.name} count={products.filter((p) => p.categorySlug === c.slug).length} checked={cats.includes(c.slug)} onChange={() => toggle(cats, setCats, c.slug)} />
            ))}
          </FilterGroup>

          <FilterGroup title="Protocol">
            {protocols.map((p) => (
              <Checkbox key={p} label={p} checked={protos.includes(p)} onChange={() => toggle(protos, setProtos, p)} />
            ))}
          </FilterGroup>

          {filtersOpen && (
            <div className="sticky bottom-0 -mx-6 mt-4 border-t border-border bg-white p-4 lg:hidden">
              <button onClick={() => setFiltersOpen(false)} className="btn-primary w-full">Show {filtered.length} results</button>
            </div>
          )}
        </aside>

        {/* Results */}
        <div>
          <div className="hidden lg:flex items-center justify-between mb-5">
            <p className="text-sm text-secondary">Showing <strong className="text-primary">{filtered.length}</strong> of {products.length} products</p>
            <div className="flex items-center gap-2">
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="input !py-2 !w-auto !pr-8 text-sm">
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="name">Sort: A → Z</option>
              </select>
              <div className="inline-flex rounded-lg border border-border bg-white p-0.5">
                <button onClick={() => setView("grid")} aria-label="Grid view" className={`grid h-9 w-9 place-items-center rounded-md cursor-pointer ${view === "grid" ? "bg-primary text-white" : "text-secondary"}`}><Icon name="grid" className="w-4 h-4" /></button>
                <button onClick={() => setView("list")} aria-label="List view" className={`grid h-9 w-9 place-items-center rounded-md cursor-pointer ${view === "list" ? "bg-primary text-white" : "text-secondary"}`}><Icon name="list" className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {activeCount > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {mfrs.map((s) => <ActiveChip key={s} label={manufacturers.find(m => m.slug === s)!.name} onRemove={() => toggle(mfrs, setMfrs, s)} />)}
              {cats.map((s) => <ActiveChip key={s} label={categories.find(c => c.slug === s)!.name} onRemove={() => toggle(cats, setCats, s)} />)}
              {protos.map((s) => <ActiveChip key={s} label={s} onRemove={() => toggle(protos, setProtos, s)} />)}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-lg font-semibold text-primary">No products match your filters</p>
              <p className="mt-1 text-sm text-secondary">Try removing a filter or searching a different term.</p>
              <button onClick={clearAll} className="btn-secondary mt-5">Clear filters</button>
            </div>
          ) : view === "grid" ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          ) : (
            <div className="card divide-y divide-border overflow-hidden">
              {filtered.map((p) => {
                const m = manufacturers.find((x) => x.slug === p.manufacturerSlug)!;
                const c = categories.find((x) => x.slug === p.categorySlug)!;
                return (
                  <a key={p.slug} href={`/product/${p.slug}`} className="flex items-center gap-5 p-4 hover:bg-slate-50 cursor-pointer">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-border bg-white font-bold text-primary">{m.logoMark}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-secondary">{m.name} · {c.name}</p>
                      <p className="font-semibold text-primary truncate">{p.name}</p>
                      <p className="text-sm text-secondary truncate">{p.shortDescription}</p>
                    </div>
                    <span className="hidden md:inline chip !text-[11px]">{p.supportStatus}</span>
                    <Icon name="arrow-right" className="text-secondary" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details open className="group border-t border-border py-4 first:border-t-0">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-primary">
        {title}
        <Icon name="chevron-down" className="w-4 h-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-3 space-y-2">{children}</div>
    </details>
  );
}

function Checkbox({ label, count, checked, onChange }: { label: string; count?: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm group">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <span className={`grid h-[18px] w-[18px] place-items-center rounded border transition-colors ${checked ? "border-cta bg-cta" : "border-slate-300 bg-white group-hover:border-slate-400"}`}>
        {checked && <Icon name="check" className="w-3 h-3 text-white" />}
      </span>
      <span className="flex-1 text-secondary group-hover:text-primary">{label}</span>
      {count !== undefined && <span className="text-xs text-slate-400">{count}</span>}
    </label>
  );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="chip !border-cta/30 !bg-cta/5 !text-cta">
      {label}
      <button onClick={onRemove} aria-label={`Remove ${label}`} className="cursor-pointer"><Icon name="x" className="w-3 h-3" /></button>
    </span>
  );
}
