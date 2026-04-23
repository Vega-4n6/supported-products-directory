import { manufacturers } from "@/data/cms";

export function ManufacturerLogo({ slug, size = 40 }: { slug: string; size?: number }) {
  const m = manufacturers.find((x) => x.slug === slug);
  if (!m) return null;
  return (
    <div
      className="grid place-items-center rounded-lg border border-border bg-white font-bold tracking-tight text-primary"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
      aria-label={`${m.name} logo`}
    >
      {m.logoMark}
    </div>
  );
}
