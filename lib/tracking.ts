// Download click tracking — dual-send to GA4 + custom webhook.
// In Webflow: port this logic to a global <script> in Site Settings > Custom Code.

type TrackPayload = {
  productSlug: string;
  productName: string;
  manufacturerSlug: string;
  assetType: "Datasheet" | "Driver" | "Manual";
  assetLabel: string;
};

export function trackDownload(p: TrackPayload) {
  if (typeof window === "undefined") return;

  // 1. Google Analytics 4
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", "download", {
      event_category: "product_download",
      event_label: p.assetLabel,
      product_slug: p.productSlug,
      product_name: p.productName,
      manufacturer: p.manufacturerSlug,
      asset_type: p.assetType,
    });
  }

  // 2. Custom webhook (Webflow Logic → Google Sheet / CRM)
  const beacon = { ...p, timestamp: new Date().toISOString(), url: window.location.href };
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track-download", JSON.stringify(beacon));
    }
  } catch {
    /* silent */
  }

  // 3. Local console (dev only — visible for the pitch demo)
  // eslint-disable-next-line no-console
  console.info("[Track] Download:", beacon);
}
