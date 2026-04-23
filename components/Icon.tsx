import type { SVGProps } from "react";

type IconName =
  | "search" | "arrow-right" | "download" | "file-text" | "book" | "external"
  | "check" | "x" | "menu" | "filter" | "grid" | "list" | "chevron-down"
  | "shield" | "zap" | "link" | "cpu" | "monitor" | "sliders" | "camera"
  | "waveform" | "switch" | "speaker" | "anchor";

const PATHS: Record<IconName, React.ReactNode> = {
  "search": <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  "arrow-right": <path d="M5 12h14M13 5l7 7-7 7" />,
  "download": <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>,
  "file-text": <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h6" /></>,
  "book": <><path d="M4 4v16a2 2 0 0 0 2 2h13V2H6a2 2 0 0 0-2 2Z" /><path d="M8 7h7M8 11h7" /></>,
  "external": <><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></>,
  "check": <path d="m5 12 5 5L20 7" />,
  "x": <path d="M6 6l12 12M18 6 6 18" />,
  "menu": <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  "filter": <path d="M3 5h18l-7 9v5l-4 2v-7Z" />,
  "grid": <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  "list": <><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="4" cy="6" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="18" r="1" /></>,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "shield": <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6Z" />,
  "zap": <path d="M13 2 4 14h7l-1 8 9-12h-7Z" />,
  "link": <><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 1 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 1 0 7 7l1-1" /></>,
  "cpu": <><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></>,
  "monitor": <><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  "sliders": <><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" /><circle cx="4" cy="12" r="2" /><circle cx="12" cy="10" r="2" /><circle cx="20" cy="14" r="2" /></>,
  "camera": <><path d="M23 7.5V17a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2Z" /><circle cx="12" cy="12.5" r="4" /></>,
  "waveform": <path d="M3 12h2l2-7 3 14 3-10 3 6 2-3h3" />,
  "switch": <><rect x="2" y="6" width="20" height="12" rx="6" /><circle cx="16" cy="12" r="3" /></>,
  "speaker": <><rect x="6" y="3" width="12" height="18" rx="2" /><circle cx="12" cy="14" r="3" /><circle cx="12" cy="7" r="1" /></>,
  "anchor": <><circle cx="12" cy="5" r="2" /><path d="M12 7v14M5 15a7 7 0 0 0 14 0M8 11h8" /></>,
};

export function Icon({ name, className = "w-5 h-5", ...rest }: { name: IconName | string } & SVGProps<SVGSVGElement>) {
  const d = PATHS[name as IconName] ?? PATHS["check"];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {d}
    </svg>
  );
}
