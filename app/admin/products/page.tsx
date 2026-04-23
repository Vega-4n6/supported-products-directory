"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { products as seedProducts, manufacturers, categories, Product, SupportStatus } from "@/data/cms";
import { Icon } from "@/components/Icon";

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>(seedProducts);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<SupportStatus | "all">("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      if (status !== "all" && p.supportStatus !== status) return false;
      if (q) {
        const h = `${p.name} ${p.sku} ${p.manufacturerSlug}`.toLowerCase();
        if (!h.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [items, q, status]);

  const remove = (slug: string) => {
    if (confirm("Delete this product?")) setItems(items.filter((p) => p.slug !== slug));
  };

  const upsert = (p: Product, isNew: boolean) => {
    setItems(isNew ? [p, ...items] : items.map((x) => (x.slug === p.slug ? p : x)));
    setEditing(null);
    setCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Collection</p>
          <h1 className="mt-1 text-3xl font-bold text-primary tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-secondary">{items.length} items · CMS-first, no hardcoding</p>
        </div>
        <button onClick={() => setCreating(true)} className="btn-primary">
          <Icon name="check" className="w-4 h-4" /> New product
        </button>
      </div>

      {/* Toolbar */}
      <div className="card p-3 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, SKU, manufacturer…" className="input !py-2 !pl-9 !text-sm" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value as SupportStatus | "all")} className="input !py-2 !w-auto !text-sm">
          <option value="all">All statuses</option>
          <option value="Fully Supported">Fully Supported</option>
          <option value="Beta">Beta</option>
          <option value="Community">Community</option>
        </select>
        <span className="text-sm text-secondary ml-auto">{filtered.length} showing</span>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-secondary">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Manufacturer</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Updated</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => {
                const m = manufacturers.find((x) => x.slug === p.manufacturerSlug)!;
                const c = categories.find((x) => x.slug === p.categorySlug)!;
                return (
                  <tr key={p.slug} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <p className="font-semibold text-primary">{p.name}</p>
                      <p className="text-xs text-secondary font-mono">{p.sku}</p>
                    </td>
                    <td className="px-5 py-3 text-primary">{m.name}</td>
                    <td className="px-5 py-3 text-secondary">{c.name}</td>
                    <td className="px-5 py-3">
                      <span className={`chip !text-[11px] ${p.supportStatus === "Fully Supported" ? "!border-emerald-200 !bg-emerald-50 !text-emerald-700" : p.supportStatus === "Beta" ? "!border-amber-200 !bg-amber-50 !text-amber-700" : ""}`}>{p.supportStatus}</span>
                    </td>
                    <td className="px-5 py-3 text-xs text-secondary">{new Date(p.lastUpdated).toLocaleDateString()}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <Link href={`/product/${p.slug}`} target="_blank" className="grid h-8 w-8 place-items-center rounded-md border border-border text-secondary hover:text-cta hover:border-cta cursor-pointer" aria-label="Preview"><Icon name="external" className="w-4 h-4" /></Link>
                        <button onClick={() => setEditing(p)} className="grid h-8 w-8 place-items-center rounded-md border border-border text-secondary hover:text-cta hover:border-cta cursor-pointer" aria-label="Edit"><Icon name="sliders" className="w-4 h-4" /></button>
                        <button onClick={() => remove(p.slug)} className="grid h-8 w-8 place-items-center rounded-md border border-border text-secondary hover:text-red-600 hover:border-red-300 cursor-pointer" aria-label="Delete"><Icon name="x" className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-secondary">No matching products.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(editing || creating) && (
        <ProductDrawer
          initial={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSave={(p) => upsert(p, creating)}
        />
      )}
    </div>
  );
}

function ProductDrawer({ initial, onClose, onSave }: { initial: Product | null; onClose: () => void; onSave: (p: Product) => void }) {
  const blank: Product = {
    slug: "", name: "", sku: "", manufacturerSlug: manufacturers[0].slug, categorySlug: categories[0].slug,
    protocols: [], shortDescription: "", longDescription: "", specs: [], supportStatus: "Fully Supported",
    firmware: "v1.0", lastUpdated: new Date().toISOString().slice(0, 10), featured: false, downloads: [],
  };
  const [form, setForm] = useState<Product>(initial ?? blank);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    onSave({ ...form, slug, lastUpdated: new Date().toISOString().slice(0, 10) });
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <form onSubmit={save} className="w-full max-w-xl bg-white flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 h-16 border-b border-border">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{initial ? "Edit" : "New"} product</p>
            <p className="text-sm font-bold text-primary">{form.name || "Untitled"}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-lg border border-border cursor-pointer"><Icon name="x" /></button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-5">
          <Field label="Product name" required><input required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="SKU"><input className="input font-mono" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} /></Field>
            <Field label="Firmware"><input className="input" value={form.firmware} onChange={(e) => setForm({ ...form, firmware: e.target.value })} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Manufacturer">
              <select className="input" value={form.manufacturerSlug} onChange={(e) => setForm({ ...form, manufacturerSlug: e.target.value })}>
                {manufacturers.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}
              </select>
            </Field>
            <Field label="Category">
              <select className="input" value={form.categorySlug} onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}>
                {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Support status">
            <div className="flex flex-wrap gap-2">
              {(["Fully Supported", "Beta", "Community"] as SupportStatus[]).map((s) => (
                <button type="button" key={s} onClick={() => setForm({ ...form, supportStatus: s })} className={`chip cursor-pointer ${form.supportStatus === s ? "!border-cta !bg-cta/10 !text-cta" : ""}`}>{s}</button>
              ))}
            </div>
          </Field>
          <Field label="Short description"><textarea className="input" rows={2} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} /></Field>
          <Field label="Long description"><textarea className="input" rows={4} value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} /></Field>

          <Field label="Featured on homepage">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-cta" />
              <span className="text-sm text-primary">Show in Featured Products</span>
            </label>
          </Field>
        </div>

        <div className="flex items-center justify-end gap-2 px-6 h-16 border-t border-border bg-slate-50">
          <button type="button" onClick={onClose} className="btn-secondary !py-2">Cancel</button>
          <button type="submit" className="btn-primary !py-2"><Icon name="check" className="w-4 h-4" /> Save product</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}{required && <span className="text-cta"> *</span>}</label>
      {children}
    </div>
  );
}
