import Link from "next/link";
import { manufacturers, Product, categories } from "@/data/cms";
import { ManufacturerLogo } from "./ManufacturerLogo";
import { Icon } from "./Icon";

export default function ProductCard({ p }: { p: Product }) {
  const m = manufacturers.find((x) => x.slug === p.manufacturerSlug)!;
  const c = categories.find((x) => x.slug === p.categorySlug)!;
  return (
    <Link href={`/product/${p.slug}`} className="card group flex flex-col p-5 cursor-pointer">
      <div className="flex items-start justify-between gap-3">
        <ManufacturerLogo slug={m.slug} size={44} />
        <span className={`chip ${p.supportStatus === "Fully Supported" ? "!border-emerald-200 !bg-emerald-50 !text-emerald-700" : p.supportStatus === "Beta" ? "!border-amber-200 !bg-amber-50 !text-amber-700" : ""}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${p.supportStatus === "Fully Supported" ? "bg-emerald-500" : p.supportStatus === "Beta" ? "bg-amber-500" : "bg-slate-400"}`} />
          {p.supportStatus}
        </span>
      </div>

      <div className="mt-4 flex-1">
        <p className="text-xs font-medium text-secondary">{m.name} · {c.name}</p>
        <h3 className="mt-1 text-base font-semibold text-primary leading-snug group-hover:text-cta transition-colors">
          {p.name}
        </h3>
        <p className="mt-2 text-sm text-secondary line-clamp-2">{p.shortDescription}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.protocols.slice(0, 3).map((pr) => (
          <span key={pr} className="chip !py-0.5 !text-[11px]">{pr}</span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-secondary">{p.downloads.length} download{p.downloads.length === 1 ? "" : "s"}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-cta">
          View <Icon name="arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
