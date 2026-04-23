import Link from "next/link";
import { Icon } from "@/components/Icon";

const benefits = [
  { icon: "shield", title: "Officially tested", body: "Every supported product passes a hands-on validation lab before it enters the catalog." },
  { icon: "zap", title: "Faster commissioning", body: "Pre-built drivers mean your integrator spends hours on-site, not days." },
  { icon: "check", title: "Maintained drivers", body: "We ship firmware-tracked driver updates so your deployments stay compatible over time." },
  { icon: "link", title: "Ecosystem coverage", body: "Cross-manufacturer compatibility is tested — so mixed-brand rooms don't surprise you." },
] as const;

const faqs = [
  { q: "What does 'supported' actually mean?", a: "A product marked as supported has been verified on our integration platform, includes a maintained driver package, and is covered by our engineering team for bug fixes and firmware compatibility." },
  { q: "How often are drivers updated?", a: "Supported drivers are reviewed every release cycle (typically every 6–8 weeks) and tracked against the manufacturer's latest firmware." },
  { q: "Is there a cost to manufacturers?", a: "No. We cover testing and driver maintenance. Manufacturers provide sample hardware and technical documentation." },
  { q: "How long does the support process take?", a: "Typical time from application to live listing is 4–6 weeks depending on hardware availability and driver complexity." },
];

export default function WhySupportedPage() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="container-x py-16 md:py-20 max-w-4xl">
          <p className="text-sm font-semibold tracking-wider uppercase text-cta">Why supported matters</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-[1.1]">
            Specifying a supported product is the difference between a <span className="text-cta">smooth install</span> and a <span className="text-primary">service call.</span>
          </h1>
          <p className="mt-5 text-lg text-secondary leading-relaxed">
            When a product is officially supported by our platform, you&apos;re not just buying a datasheet spec. You&apos;re buying a tested integration, a maintained driver, and an engineering team that stands behind the listing.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {benefits.map((b) => (
            <div key={b.title} className="card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-cta/10 text-cta">
                {/* @ts-expect-error runtime icon */}
                <Icon name={b.icon} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-primary">{b.title}</h3>
              <p className="mt-1 text-secondary leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-10">
        <div className="rounded-2xl border border-border bg-white p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">The numbers tell the story</h2>
          <p className="mt-2 text-secondary">Data from our deployment base, 2024–2026.</p>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {[
              { n: "72%", l: "Fewer on-site service calls on rooms built with supported-only products" },
              { n: "3.4x", l: "Faster commissioning vs. unsupported alternatives" },
              { n: "98.1%", l: "Driver uptime across active deployments" },
            ].map((s) => (
              <div key={s.n}>
                <p className="text-4xl md:text-5xl font-extrabold tracking-tight text-cta">{s.n}</p>
                <p className="mt-2 text-sm text-secondary leading-relaxed">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">Frequently asked</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group card p-5 cursor-pointer">
              <summary className="flex items-center justify-between list-none">
                <span className="font-semibold text-primary pr-4">{f.q}</span>
                <Icon name="chevron-down" className="w-5 h-5 text-secondary transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-secondary leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container-x py-10">
        <div className="rounded-2xl bg-primary text-white p-8 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Ready to get your product supported?</h2>
          <p className="mt-3 text-white/75 max-w-xl mx-auto">Application takes 2 minutes. Engineering review in under a week.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/get-supported" className="btn-primary !bg-white !text-primary hover:!bg-slate-100">
              Start application <Icon name="arrow-right" className="w-4 h-4" />
            </Link>
            <Link href="/directory" className="btn-secondary !bg-transparent !border-white/25 !text-white hover:!bg-white/10">Browse catalog</Link>
          </div>
        </div>
      </section>
    </>
  );
}
