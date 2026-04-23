"use client";
import { useState } from "react";
import { categories as seed, products, Category } from "@/data/cms";
import { Icon } from "@/components/Icon";

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<Category[]>(seed);
  const [name, setName] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setItems([...items, { slug, name, icon: "list" }]);
    setName("");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Collection</p>
        <h1 className="mt-1 text-3xl font-bold text-primary tracking-tight">Categories</h1>
        <p className="mt-1 text-sm text-secondary">{items.length} items</p>
      </div>

      <form onSubmit={add} className="card p-4 flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name…" className="input !py-2 flex-1" />
        <button type="submit" className="btn-primary !py-2"><Icon name="check" className="w-4 h-4" /> Add</button>
      </form>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-secondary">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Slug</th>
              <th className="px-5 py-3">Products</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((c) => {
              const count = products.filter((p) => p.categorySlug === c.slug).length;
              return (
                <tr key={c.slug} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-semibold text-primary">{c.name}</td>
                  <td className="px-5 py-3 text-xs font-mono text-secondary">/{c.slug}</td>
                  <td className="px-5 py-3 text-secondary">{count}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setItems(items.filter((x) => x.slug !== c.slug))} className="grid h-8 w-8 ml-auto place-items-center rounded-md border border-border text-secondary hover:text-red-600 hover:border-red-300 cursor-pointer" aria-label="Delete"><Icon name="x" className="w-4 h-4" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
