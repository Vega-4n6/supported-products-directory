"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icon";

type Event = { ts: number; product: string; asset: "Datasheet" | "Driver" | "Manual" };

const PRODUCTS = [
  "DM-NVX-360", "Core 110f", "MXA920", "QM75C", "DTP3 T 202",
  "TesiraFORTÉ X 400", "SRG-X400", "55UH7J-H",
];
const ASSETS: Event["asset"][] = ["Datasheet", "Driver", "Manual"];

// Deterministic pseudo-random so SSR + first render match; seeded after mount.
function seedHistory(now: number): Event[] {
  const out: Event[] = [];
  let t = now - 60_000;
  while (t < now) {
    t += 1500 + Math.random() * 4500;
    if (t < now) out.push({
      ts: t,
      product: PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
      asset: ASSETS[Math.floor(Math.random() * ASSETS.length)],
    });
  }
  return out;
}

export function ClickMonitor() {
  const [events, setEvents] = useState<Event[]>([]);
  const [pulse, setPulse] = useState(0);
  const feedRef = useRef<HTMLUListElement>(null);

  // Seed on mount.
  useEffect(() => {
    setEvents(seedHistory(Date.now()));
  }, []);

  // Simulated live stream.
  useEffect(() => {
    const tick = () => {
      const e: Event = {
        ts: Date.now(),
        product: PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
        asset: ASSETS[Math.floor(Math.random() * ASSETS.length)],
      };
      setEvents((prev) => {
        const cutoff = Date.now() - 60_000;
        return [...prev.filter((x) => x.ts > cutoff), e];
      });
      setPulse((p) => p + 1);
    };
    const i = setInterval(tick, 1800 + Math.random() * 2400);
    return () => clearInterval(i);
  }, []);

  // Derived metrics (last 60s bucketed into 30 × 2s bars).
  const now = events[events.length - 1]?.ts ?? Date.now();
  const buckets = useMemo(() => {
    const size = 30;
    const out = new Array(size).fill(0);
    events.forEach((e) => {
      const delta = Math.floor((now - e.ts) / 2000);
      if (delta >= 0 && delta < size) out[size - 1 - delta]++;
    });
    return out;
  }, [events, now]);

  const ratePerMin = events.length; // all events are within 60s
  const peak = Math.max(1, ...buckets);
  const gaugePct = Math.min(100, (ratePerMin / 40) * 100); // 40/min = 100%

  const last8 = events.slice(-8).reverse();

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
            <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <h2 className="font-bold text-primary">Live click monitor</h2>
          <span key={pulse} className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 animate-[fadeIn_0.5s_ease-out]">
            +1 event
          </span>
        </div>
        <p className="text-xs text-secondary">Streaming · last 60s</p>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Gauge */}
        <div className="p-6 flex flex-col items-center justify-center gap-3">
          <Gauge value={gaugePct} />
          <div className="text-center">
            <p className="text-3xl font-extrabold tracking-tight text-primary tabular-nums">{ratePerMin}</p>
            <p className="text-xs text-secondary uppercase tracking-wider font-semibold">downloads / min</p>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full pt-3 border-t border-border">
            <MiniStat label="Peak/2s" value={peak} />
            <MiniStat label="Rolling" value={Math.round(ratePerMin * 1.0)} />
            <MiniStat label="Hourly*" value={ratePerMin * 60} />
          </div>
        </div>

        {/* Activity bars + feed */}
        <div className="flex flex-col">
          <div className="px-5 pt-5">
            <div className="flex items-end gap-1 h-24">
              {buckets.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-cta/20 to-cta transition-all duration-500"
                  style={{ height: `${(v / peak) * 100}%`, minHeight: v > 0 ? 4 : 2, opacity: v > 0 ? 1 : 0.2 }}
                  aria-label={`${v} events`}
                />
              ))}
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-secondary">
              <span>60s ago</span>
              <span>now</span>
            </div>
          </div>

          <div className="mt-2 border-t border-border">
            <p className="px-5 pt-4 text-xs font-bold uppercase tracking-wider text-secondary">Event feed</p>
            <ul ref={feedRef} className="px-5 py-3 space-y-2 text-sm max-h-48 overflow-auto">
              {last8.length === 0 && <li className="text-secondary text-xs">Waiting for events…</li>}
              {last8.map((e, i) => {
                const age = Math.max(0, Math.round((Date.now() - e.ts) / 1000));
                const fresh = i === 0;
                return (
                  <li
                    key={e.ts}
                    className={`flex items-center gap-3 ${fresh ? "animate-[slideIn_0.4s_ease-out]" : ""}`}
                  >
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-md ${e.asset === "Datasheet" ? "bg-cta/10 text-cta" : e.asset === "Driver" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      <Icon name={e.asset === "Datasheet" ? "file-text" : e.asset === "Driver" ? "download" : "book"} className="w-3.5 h-3.5" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block truncate font-medium text-primary">{e.product}</span>
                      <span className="block text-[11px] text-secondary">{e.asset}</span>
                    </span>
                    <span className="text-[11px] text-secondary tabular-nums whitespace-nowrap">
                      {age < 2 ? "just now" : `${age}s ago`}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-sm font-bold text-primary tabular-nums">{value}</p>
      <p className="text-[10px] text-secondary uppercase tracking-wider">{label}</p>
    </div>
  );
}

function Gauge({ value }: { value: number }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  const offset = C - (value / 100) * C * 0.75; // 3/4 arc
  const color = value < 33 ? "#10B981" : value < 66 ? "#0369A1" : "#D97706";
  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-[135deg]">
        <circle cx="60" cy="60" r={R} fill="none" stroke="#E2E8F0" strokeWidth="10" strokeDasharray={C * 0.75} strokeDashoffset="0" strokeLinecap="round" />
        <circle
          cx="60" cy="60" r={R}
          fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={C * 0.75}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 600ms ease, stroke 400ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center -mt-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-secondary">Load</p>
          <p className="text-xl font-extrabold text-primary tabular-nums">{Math.round(value)}%</p>
        </div>
      </div>
    </div>
  );
}
