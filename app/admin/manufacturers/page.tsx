"use client";
import { useState } from "react";
import { manufacturers as seed, Manufacturer } from "@/data/cms";
import { Icon } from "@/components/Icon";

export default function AdminManufacturersPage() {
  const [items, setItems] = useState<Manufacturer[]>(seed);
  const [editing, setEditing] = useState<Manufacturer | null>(null);

  const remove = (slug: string) => {
    if (confirm("Delete this manufacturer?")) setItems(items.filter((m) => m.slug !== slug));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Collection</p>
          <h1 className="mt-1 text-3xl font-bold text-primary tracking-tight">Manufacturers</h1>
          <p className="mt-1 text-sm text-secondary">{items.length} items</p>
        </div>
        <button onClick={() => setEditing({ slug: "", name: "", logoMark: "", website: "", tier: "Standard", description: "", productCount: 0 })} className="btn-primary">
          <Icon name="check" className="w-4 h-4" /> New manufacturer
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((m) => (
          <div key={m.slug} className="card p-5 flex gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-primary text-white font-bold text-lg">{m.logoMark}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-primary truncate">{m.name}</p>
                <span className={`chip !text-[11px] ${m.tier === "Gold" ? "!border-amber-200 !bg-amber-50 !text-amber-700" : m.tier === "Silver" ? "!border-slate-200 !bg-slate-50 !text-secondary" : ""}`}>{m.tier}</span>
              </div>
              <p className="text-xs text-secondary mt-0.5 truncate">{m.description}</p>
              <p className="mt-2 text-xs text-secondary">{m.productCount} products</p>
              <div className="mt-3 flex gap-1">
                <button onClick={() => setEditing(m)} className="grid h-8 w-8 place-items-center rounded-md border border-border text-secondary hover:text-cta hover:border-cta cursor-pointer" aria-label="Edit"><Icon name="sliders" className="w-4 h-4" /></button>
                <button onClick={() => remove(m.slug)} className="grid h-8 w-8 place-items-center rounded-md border border-border text-secondary hover:text-red-600 hover:border-red-300 cursor-pointer" aria-label="Delete"><Icon name="x" className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && <Drawer initial={editing} onClose={() => setEditing(null)} onSave={(m) => { setItems(items.find((x) => x.slug === m.slug) ? items.map((x) => x.slug === m.slug ? m : x) : [m, ...items]); setEditing(null); }} />}
    </div>
  );
}

function Drawer({ initial, onClose, onSave }: { initial: Manufacturer; onClose: () => void; onSave: (m: Manufacturer) => void }) {
  const [f, setF] = useState<Manufacturer>(initial);
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = f.slug || f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    onSave({ ...f, slug, logoMark: f.logoMark || f.name.slice(0, 2).toUpperCase() });
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <form onSubmit={save} className="w-full max-w-md bg-white flex flex-col">
        <div className="flex items-center justify-between px-6 h-16 border-b border-border">
          <p className="font-bold text-primary">{initial.slug ? "Edit" : "New"} manufacturer</p>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-lg border border-border cursor-pointer"><Icon name="x" /></button>
        </div>
        <div className="flex-1 p-6 space-y-4 overflow-auto">
          <div><label className="label">Name *</label><input required className="input" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
          <div><label className="label">Logo mark (2–3 letters)</label><input maxLength={3} className="input uppercase" value={f.logoMark} onChange={(e) => setF({ ...f, logoMark: e.target.value.toUpperCase() })} /></div>
          <div><label className="label">Website</label><input type="url" className="input" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} /></div>
          <div>
            <label className="label">Tier</label>
            <div className="flex gap-2">
              {(["Gold", "Silver", "Standard"] as const).map((t) => (
                <button type="button" key={t} onClick={() => setF({ ...f, tier: t })} className={`chip cursor-pointer ${f.tier === t ? "!border-cta !bg-cta/10 !text-cta" : ""}`}>{t}</button>
              ))}
            </div>
          </div>
          <div><label className="label">Description</label><textarea rows={3} className="input" value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></div>
        </div>
        <div className="flex justify-end gap-2 p-4 border-t border-border bg-slate-50">
          <button type="button" onClick={onClose} className="btn-secondary !py-2">Cancel</button>
          <button type="submit" className="btn-primary !py-2"><Icon name="check" className="w-4 h-4" /> Save</button>
        </div>
      </form>
    </div>
  );
}
