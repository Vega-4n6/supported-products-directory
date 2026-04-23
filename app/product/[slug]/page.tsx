import Link from "next/link";
import { notFound } from "next/navigation";
import { products, manufacturers, categories } from "@/data/cms";
import DownloadButton from "@/components/DownloadButton";
import ProductCard from "@/components/ProductCard";
import { ManufacturerLogo } from "@/components/ManufacturerLogo";
import { Icon } from "@/components/Icon";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  const m = manufacturers.find((x) => x.slug === product.manufacturerSlug)!;
  const c = categories.find((x) => x.slug === product.categorySlug)!;
  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 3);

  // Structured data — Product + Organization (per requirements)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.shortDescription,
    brand: { "@type": "Organization", name: m.name, url: m.website },
    category: c.name,
    additionalProperty: product.specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-white">
        <div className="container-x py-4 flex flex-wrap items-center gap-2 text-sm text-secondary">
          <Link href="/" className="hover:text-primary cursor-pointer">Home</Link>
          <span>/</span>
          <Link href="/directory" className="hover:text-primary cursor-pointer">Directory</Link>
          <span>/</span>
          <Link href={`/directory?manufacturer=${m.slug}`} className="hover:text-primary cursor-pointer">{m.name}</Link>
          <span>/</span>
          <span className="text-primary font-medium truncate">{product.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="container-x py-10 grid lg:grid-cols-[1.1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-3">
            <ManufacturerLogo slug={m.slug} size={44} />
            <div>
              <Link href={`/directory?manufacturer=${m.slug}`} className="text-sm font-semibold text-cta cursor-pointer">{m.name}</Link>
              <p className="text-xs text-secondary">{c.name}</p>
            </div>
          </div>
          <h1 className="mt-5 text-3xl md:text-4xl font-bold text-primary tracking-tight leading-[1.15]">{product.name}</h1>
          <p className="mt-2 text-sm text-secondary">SKU: <span className="font-mono text-primary">{product.sku}</span></p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className={`chip ${product.supportStatus === "Fully Supported" ? "!border-emerald-200 !bg-emerald-50 !text-emerald-700" : product.supportStatus === "Beta" ? "!border-amber-200 !bg-amber-50 !text-amber-700" : ""}`}>
              <Icon name="check" className="w-3 h-3" /> {product.supportStatus}
            </span>
            {product.protocols.map((p) => <span key={p} className="chip">{p}</span>)}
          </div>

          <p className="mt-6 text-lg text-secondary leading-relaxed">{product.longDescription}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#downloads" className="btn-primary"><Icon name="download" className="w-4 h-4" /> View downloads</a>
            <a href={m.website} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Visit {m.name} <Icon name="external" className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Visual card */}
        <div className="card p-8 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden min-h-[320px] grid place-items-center">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #0F172A 1px, transparent 0)", backgroundSize: "20px 20px" }} />
          <div className="relative text-center">
            <div className="grid h-32 w-32 mx-auto place-items-center rounded-2xl bg-primary text-white text-5xl font-bold shadow-card">
              {m.logoMark}
            </div>
            <p className="mt-6 font-mono text-xs text-secondary">{product.sku}</p>
            <p className="mt-1 font-semibold text-primary">{product.name}</p>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="container-x py-6 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-primary">Specifications</h2>
          <div className="mt-4 card overflow-hidden">
            <dl className="divide-y divide-border">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[160px_1fr] gap-4 px-5 py-3.5 text-sm">
                  <dt className="font-medium text-secondary">{s.label}</dt>
                  <dd className="text-primary">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-primary">Integration status</h2>
          <div className="mt-4 card p-5 space-y-4">
            <Row label="Support status" value={product.supportStatus} />
            <Row label="Driver firmware" value={product.firmware} />
            <Row label="Last updated" value={new Date(product.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} />
            <Row label="Manufacturer tier" value={m.tier} />
            <Row label="Protocols" value={product.protocols.join(", ")} />
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads" className="container-x py-10">
        <h2 className="text-xl font-bold text-primary">Downloads</h2>
        <p className="mt-1 text-sm text-secondary">Click tracking is active — each download is logged to analytics with product + asset metadata.</p>
        <div className="mt-5 grid sm:grid-cols-2 gap-3">
          {product.downloads.map((f) => (
            <DownloadButton key={f.label} product={product} file={f} />
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-x py-10">
          <h2 className="text-xl font-bold text-primary">Related products</h2>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </section>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-secondary">{label}</span>
      <span className="font-semibold text-primary">{value}</span>
    </div>
  );
}
