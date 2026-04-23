"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { products, manufacturers, categories, Product } from "@/data/cms";
import { Icon } from "./Icon";

type Msg =
  | { role: "user"; text: string }
  | { role: "assistant"; text: string; cites?: Product[] };

const SUGGESTIONS = [
  "Which products support Dante?",
  "Show me 4K PTZ cameras",
  "What Crestron products are supported?",
  "Ceiling microphones under integration",
];

const GREETING =
  "Hi — I'm trained on the full product catalog. Ask about protocols, manufacturers, or a room type and I'll cite matching products with links.";

// Deterministic "agent": keyword match against the CMS. Demonstrates the UX of a
// production RAG agent grounded on the catalog — swap this function for a call
// to an LLM + vector store when going live.
function answer(q: string): { text: string; cites: Product[] } {
  const lower = q.toLowerCase();
  const tokens = lower.split(/[\s,]+/).filter(Boolean);

  const matched = products.filter((p) => {
    const hay = [
      p.name, p.sku, p.shortDescription, p.longDescription,
      p.manufacturerSlug, p.categorySlug, ...p.protocols,
      manufacturers.find((m) => m.slug === p.manufacturerSlug)?.name ?? "",
      categories.find((c) => c.slug === p.categorySlug)?.name ?? "",
    ].join(" ").toLowerCase();
    return tokens.some((t) => hay.includes(t));
  });

  if (matched.length === 0) {
    return {
      text: `I couldn't find a direct match for "${q}" in the catalog. Try asking about a specific manufacturer (Crestron, Shure, QSC), a protocol (Dante, RS-232, HDMI-CEC), or a category (cameras, displays, audio processors).`,
      cites: [],
    };
  }

  const top = matched.slice(0, 3);
  const mfrSet = new Set(top.map((p) => p.manufacturerSlug));
  const mfrLabel = Array.from(mfrSet)
    .map((s) => manufacturers.find((m) => m.slug === s)?.name)
    .filter(Boolean)
    .join(", ");

  const verb = tokens.find((t) => ["support", "supported", "compatible", "work"].includes(t)) ? "are officially supported" : "match that";
  const text = `Found ${matched.length} product${matched.length === 1 ? "" : "s"} that ${verb}. Top picks from ${mfrLabel}:`;
  return { text, cites: top };
}

export function AiAssistant() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [thinking, setThinking] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", text: GREETING }]);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [msgs, thinking]);

  if (!mounted || path?.startsWith("/admin")) return null;

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setQ("");
    setThinking(true);
    setTimeout(() => {
      const a = answer(text);
      setMsgs((m) => [...m, { role: "assistant", text: a.text, cites: a.cites }]);
      setThinking(false);
    }, 700 + Math.random() * 500);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI assistant"
        className="group fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-br from-cta to-primary text-white pl-3 pr-5 py-3 shadow-[0_12px_32px_-8px_rgba(3,105,161,0.55)] hover:shadow-[0_16px_40px_-8px_rgba(3,105,161,0.7)] cursor-pointer transition-all"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
          <SparkleIcon />
        </span>
        <span className="text-sm font-semibold">Ask the catalog</span>
        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 left-5 right-5 sm:right-auto z-50 sm:w-[380px]">
      <div className="flex flex-col max-h-[70vh] rounded-2xl bg-white shadow-[0_24px_64px_-16px_rgba(15,23,42,0.45)] ring-1 ring-border overflow-hidden">
        {/* Header */}
        <div className="relative px-4 py-3 bg-gradient-to-br from-cta to-primary text-white flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
            <SparkleIcon />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold leading-tight">Catalog Assistant</p>
            <p className="text-[11px] text-white/75 flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Trained on {products.length} products · {manufacturers.length} manufacturers
            </p>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer">
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-auto px-4 py-4 space-y-3 bg-slate-50">
          {msgs.map((m, i) => m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-cta text-white px-3.5 py-2 text-sm shadow-sm">{m.text}</div>
            </div>
          ) : (
            <div key={i} className="flex gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cta to-primary text-white"><SparkleIcon small /></span>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="rounded-2xl rounded-tl-md bg-white border border-border px-3.5 py-2 text-sm text-primary shadow-sm">{m.text}</div>
                {m.cites && m.cites.length > 0 && (
                  <div className="space-y-1.5">
                    {m.cites.map((p) => {
                      const mfr = manufacturers.find((x) => x.slug === p.manufacturerSlug)!;
                      return (
                        <Link key={p.slug} href={`/product/${p.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-lg border border-border bg-white p-2.5 hover:border-cta hover:bg-cta/5 cursor-pointer transition-colors">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary text-white text-[10px] font-bold">{mfr.logoMark}</span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-xs font-semibold text-primary truncate">{p.name}</span>
                            <span className="block text-[10px] text-secondary">{mfr.name} · {p.supportStatus}</span>
                          </span>
                          <Icon name="arrow-right" className="w-3.5 h-3.5 text-secondary" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {thinking && (
            <div className="flex gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cta to-primary text-white"><SparkleIcon small /></span>
              <div className="rounded-2xl rounded-tl-md bg-white border border-border px-4 py-3 shadow-sm">
                <span className="flex items-center gap-1">
                  <Dot delay={0} /><Dot delay={150} /><Dot delay={300} />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {msgs.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5 bg-slate-50">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-white text-secondary hover:text-cta hover:border-cta cursor-pointer transition-colors">
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={(e) => { e.preventDefault(); send(q); }} className="flex items-center gap-2 p-3 border-t border-border bg-white">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask about protocols, products, compatibility…"
            className="flex-1 input !py-2.5 !text-sm"
          />
          <button type="submit" disabled={!q.trim()} className="btn-primary !py-2.5 !px-3 disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
        </form>

        <p className="px-4 pb-3 text-[10px] text-secondary bg-white">
          Prototype uses local catalog matching · production version: RAG over CMS + LLM
        </p>
      </div>
    </div>
  );
}

function SparkleIcon({ small = false }: { small?: boolean }) {
  const s = small ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={s} aria-hidden>
      <path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2zM19 14l.9 2.7L22 17.5l-2.1.8L19 21l-.9-2.7L16 17.5l2.1-.8L19 14zM5 15l.7 2L7.5 17.7 5.7 18.3 5 20l-.7-1.7L2.5 17.7l1.8-.7L5 15z" />
    </svg>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full bg-cta/60"
      style={{ animation: `aiBlink 1s ${delay}ms infinite` }}
    />
  );
}
