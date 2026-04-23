"use client";
import { useState } from "react";
import Link from "next/link";
import { categories } from "@/data/cms";
import { Icon } from "@/components/Icon";

export default function GetSupportedPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In Webflow: this form posts to Webflow Forms + webhook.
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // eslint-disable-next-line no-console
    console.info("[Form] Application submitted:", data);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <section className="container-x py-24 max-w-2xl">
        <div className="card p-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <Icon name="check" className="w-8 h-8" />
          </div>
          <h1 className="mt-5 text-3xl font-bold text-primary tracking-tight">Application received</h1>
          <p className="mt-3 text-secondary leading-relaxed">Our integration team will review your submission and reach out within 3 business days with next steps and a hardware shipping address.</p>
          <Link href="/directory" className="btn-secondary mt-6">Browse the catalog while you wait <Icon name="arrow-right" className="w-4 h-4" /></Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="container-x py-14 max-w-3xl">
          <p className="text-sm font-semibold tracking-wider uppercase text-cta">Get your product supported</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-[1.1]">
            Join the catalog in <span className="text-cta">4 to 6 weeks.</span>
          </h1>
          <p className="mt-4 text-lg text-secondary leading-relaxed">Tell us about your product. Our engineering team will review and reach out within 3 business days.</p>
        </div>
      </section>

      <section className="container-x py-12 grid lg:grid-cols-[1fr_360px] gap-10">
        <form onSubmit={onSubmit} className="card p-6 md:p-8 space-y-6">
          <Section title="Your details">
            <Field label="Full name" name="name" required />
            <Field label="Work email" name="email" type="email" required />
            <Field label="Company" name="company" required />
            <Field label="Role / title" name="role" />
          </Section>

          <Section title="Product">
            <Field label="Manufacturer" name="manufacturer" required />
            <Field label="Product name" name="product" required />
            <Field label="SKU / Model number" name="sku" />
            <div>
              <label className="label" htmlFor="category">Category</label>
              <select id="category" name="category" required className="input">
                <option value="">Select a category…</option>
                {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
          </Section>

          <Section title="Integration details">
            <div className="md:col-span-2">
              <label className="label">Control protocols supported</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                {["RS-232", "TCP/IP", "UDP", "IR", "HDMI-CEC", "Dante", "AES67", "Other"].map((p) => (
                  <label key={p} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:border-cta">
                    <input type="checkbox" name="protocols" value={p} className="accent-cta" />
                    <span className="text-sm text-primary">{p}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="label" htmlFor="notes">Anything else we should know?</label>
              <textarea id="notes" name="notes" rows={4} className="input" placeholder="Release timeline, API documentation, existing SDKs, etc." />
            </div>
          </Section>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button type="submit" className="btn-primary w-full sm:w-auto">Submit application <Icon name="arrow-right" className="w-4 h-4" /></button>
            <p className="text-xs text-secondary">By submitting you agree to our review process and privacy policy.</p>
          </div>
        </form>

        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary">What happens next</h3>
            <ol className="mt-4 space-y-3 text-sm">
              {[
                ["1", "Review", "Our integration team evaluates your product within 3 business days."],
                ["2", "Hardware", "You ship us a sample unit; we ship it back after testing."],
                ["3", "Driver build", "Our engineers build and QA a driver package."],
                ["4", "Go live", "Your product is listed in the directory with full metadata."],
              ].map(([n, t, d]) => (
                <li key={n} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cta text-white text-xs font-bold">{n}</span>
                  <span>
                    <span className="block font-semibold text-primary">{t}</span>
                    <span className="block text-secondary">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="card p-5 bg-cta/5 border-cta/20">
            <p className="text-sm font-semibold text-primary">Already a listed partner?</p>
            <p className="mt-1 text-sm text-secondary">Send firmware or driver updates directly to your integration contact.</p>
          </div>
        </aside>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-wider text-secondary mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label} {required && <span className="text-cta">*</span>}
      </label>
      <input id={name} name={name} type={type} required={required} className="input" />
    </div>
  );
}
