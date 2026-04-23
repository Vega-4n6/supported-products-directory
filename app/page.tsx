import Link from "next/link";
import { manufacturers, products, categories } from "@/data/cms";
import ProductCard from "@/components/ProductCard";
import { ManufacturerLogo } from "@/components/ManufacturerLogo";
import { Icon } from "@/components/Icon";

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-white to-surface">
        <div className="container-x pt-16 pb-20 md:pt-24 md:pb-28 relative">
          <div className="absolute inset-0 -z-10 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #0F172A 1px, transparent 0)", backgroundSize: "24px 24px" }} />

          <div className="max-w-3xl">
            <span className="chip !border-cta/20 !bg-cta/5 !text-cta">
              <span className="h-1.5 w-1.5 rounded-full bg-cta" />
              {manufacturers.length} manufacturers · {products.length}+ products supported
            </span>
            <h1 className="mt-5 text-[40px] md:text-6xl font-extrabold tracking-tight text-primary leading-[1.05]">
              Every AV product we officially support, <span className="text-cta">in one catalog.</span>
            </h1>
            <p className="mt-5 text-lg text-secondary max-w-2xl leading-relaxed">
              Browse verified drivers, datasheets, and compatibility guides. Built CMS-first so our partners can keep every listing fresh — without touching the code.
            </p>

            <form action="/directory" className="mt-8 relative max-w-xl">
              <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <input
                name="q"
                type="search"
                placeholder="Search 'Crestron DM-NVX', 'ceiling microphone'…"
                className="input !pl-11 !pr-32 !py-4 !text-base shadow-card"
              />
              <button type="submit" className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 !py-2 !px-4">
                Search <Icon name="arrow-right" className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              <span className="text-secondary mr-1">Popular:</span>
              {["4K switcher", "ceiling microphone", "PTZ camera", "Dante DSP"].map((s) => (
                <Link key={s} href={`/directory?q=${encodeURIComponent(s)}`} className="text-cta hover:underline cursor-pointer">{s}</Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary tracking-tight">Browse by category</h2>
            <p className="mt-2 text-secondary">Eight categories covering every room type and signal chain.</p>
          </div>
          <Link href="/directory" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-cta cursor-pointer">
            All products <Icon name="arrow-right" className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((c) => {
            const count = products.filter((p) => p.categorySlug === c.slug).length;
            return (
              <Link
                key={c.slug}
                href={`/directory?category=${c.slug}`}
                className="group card p-5 flex items-center gap-3 cursor-pointer"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-cta/10 text-cta transition-colors group-hover:bg-cta group-hover:text-white">
                  {/* @ts-expect-error runtime icon name */}
                  <Icon name={c.icon} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-primary truncate">{c.name}</span>
                  <span className="block text-xs text-secondary">{count} product{count === 1 ? "" : "s"}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="container-x py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary tracking-tight">Featured products</h2>
            <p className="mt-2 text-secondary">Hand-picked integrations with active driver support.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* Why Supported teaser */}
      <section className="container-x py-16">
        <div className="rounded-2xl bg-primary text-white p-8 md:p-14 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #0369A1 0, transparent 60%)" }} />
          <div className="max-w-2xl relative">
            <p className="text-sm font-semibold tracking-wider uppercase text-cta">Why supported matters</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              An integrator&apos;s shortlist should never be a guess.
            </h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              Supported means officially tested, driver-maintained, and field-proven. Specifying a supported product means fewer service calls and faster commissioning — guaranteed.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/why-supported" className="btn-primary !bg-white !text-primary hover:!bg-slate-100">
                Learn why it matters <Icon name="arrow-right" className="w-4 h-4" />
              </Link>
              <Link href="/get-supported" className="btn-secondary !bg-transparent !border-white/25 !text-white hover:!bg-white/10">
                Get your product supported
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturers strip */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary tracking-tight">Supported manufacturers</h2>
            <p className="mt-2 text-secondary">Trusted brands integrated and maintained by our team.</p>
          </div>
          <Link href="/directory" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-cta cursor-pointer">
            See all <Icon name="arrow-right" className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {manufacturers.map((m) => (
            <Link
              key={m.slug}
              href={`/directory?manufacturer=${m.slug}`}
              className="card p-4 flex items-center gap-3 cursor-pointer"
            >
              <ManufacturerLogo slug={m.slug} size={40} />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-primary truncate">{m.name}</span>
                <span className="block text-xs text-secondary">{m.productCount} products</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
