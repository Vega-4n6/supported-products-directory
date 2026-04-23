"use client";
import { useMemo } from "react";
import { products, manufacturers } from "@/data/cms";
import { Icon } from "@/components/Icon";
import { ClickMonitor } from "@/components/ClickMonitor";

// Mock download log — in production this is fed by the tracking webhook.
const mockLog = [
  { ts: "2026-04-23T10:42:11Z", productSlug: "crestron-dm-nvx-360", assetType: "Datasheet", assetLabel: "DM-NVX-360 Datasheet.pdf", country: "US" },
  { ts: "2026-04-23T09:58:02Z", productSlug: "qsc-core-110f", assetType: "Driver", assetLabel: "Q-SYS Designer Package", country: "DE" },
  { ts: "2026-04-23T08:12:49Z", productSlug: "shure-mxa920", assetType: "Datasheet", assetLabel: "MXA920 Datasheet.pdf", country: "UK" },
  { ts: "2026-04-22T22:05:18Z", productSlug: "extron-dtp3-t-202", assetType: "Manual", assetLabel: "Installation Guide", country: "US" },
  { ts: "2026-04-22T18:33:40Z", productSlug: "samsung-qm75c", assetType: "Datasheet", assetLabel: "QM75C Datasheet.pdf", country: "CA" },
  { ts: "2026-04-22T14:21:07Z", productSlug: "qsc-core-110f", assetType: "Datasheet", assetLabel: "Core 110f Datasheet.pdf", country: "AU" },
  { ts: "2026-04-22T11:09:33Z", productSlug: "crestron-dm-nvx-360", assetType: "Driver", assetLabel: "Driver Package v2.4.1", country: "US" },
  { ts: "2026-04-21T19:47:55Z", productSlug: "shure-mxa920", assetType: "Driver", assetLabel: "Designer Control Plugin", country: "NL" },
];

export default function AdminDownloadsPage() {
  const byAsset = useMemo(() => {
    const m = new Map<string, number>();
    mockLog.forEach((e) => m.set(e.assetType, (m.get(e.assetType) ?? 0) + 1));
    return Array.from(m.entries());
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Analytics</p>
        <h1 className="mt-1 text-3xl font-bold text-primary tracking-tight">Download log</h1>
        <p className="mt-1 text-sm text-secondary">Live feed from the tracking webhook — every product download is captured here and mirrored to GA4.</p>
      </div>

      <ClickMonitor />

      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Last 7 days" value={mockLog.length} sub="Total downloads" />
        <Stat label="Top asset" value="Datasheet" sub={`${byAsset.find(([t]) => t === "Datasheet")?.[1] ?? 0} pulls`} />
        <Stat label="Unique products" value={new Set(mockLog.map((e) => e.productSlug)).size} sub="With at least 1 download" />
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-bold text-primary">Recent downloads</h2>
          <button className="btn-secondary !py-2 !text-xs"><Icon name="download" className="w-3.5 h-3.5" /> Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-secondary">
                <th className="px-5 py-3">Time</th>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Asset</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Country</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockLog.map((e, i) => {
                const p = products.find((x) => x.slug === e.productSlug);
                const m = p ? manufacturers.find((x) => x.slug === p.manufacturerSlug) : undefined;
                return (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-5 py-3 text-xs text-secondary whitespace-nowrap">{new Date(e.ts).toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-primary">{p?.name}</p>
                      <p className="text-xs text-secondary">{m?.name}</p>
                    </td>
                    <td className="px-5 py-3 text-primary">{e.assetLabel}</td>
                    <td className="px-5 py-3"><span className="chip !text-[11px]">{e.assetType}</span></td>
                    <td className="px-5 py-3 text-secondary">{e.country}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string | number; sub: string }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-primary tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-secondary">{sub}</p>
    </div>
  );
}
