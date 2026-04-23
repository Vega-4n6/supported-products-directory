// Mock "CMS" — mirrors the Webflow Collection structure exactly.
// When porting: replace these arrays with Webflow Collection List output.

export type Manufacturer = {
  slug: string;
  name: string;
  logoMark: string; // 2-3 letter mark
  website: string;
  tier: "Gold" | "Silver" | "Standard";
  description: string;
  productCount: number;
};

export type Category = { slug: string; name: string; icon: string };
export type SupportStatus = "Fully Supported" | "Beta" | "Community";

export type Product = {
  slug: string;
  name: string;
  sku: string;
  manufacturerSlug: string;
  categorySlug: string;
  protocols: string[];
  shortDescription: string;
  longDescription: string;
  specs: { label: string; value: string }[];
  supportStatus: SupportStatus;
  firmware: string;
  lastUpdated: string;
  featured: boolean;
  downloads: { label: string; type: "Datasheet" | "Driver" | "Manual"; size: string; href: string }[];
};

export const categories: Category[] = [
  { slug: "amplifiers", name: "Amplifiers", icon: "cpu" },
  { slug: "displays", name: "Displays", icon: "monitor" },
  { slug: "control", name: "Control Systems", icon: "sliders" },
  { slug: "cameras", name: "Cameras", icon: "camera" },
  { slug: "audio-processors", name: "Audio Processors", icon: "waveform" },
  { slug: "video-switchers", name: "Video Switchers", icon: "switch" },
  { slug: "speakers", name: "Speakers", icon: "speaker" },
  { slug: "mounts", name: "Mounts", icon: "anchor" },
];

export const protocols = ["RS-232", "TCP/IP", "UDP", "IR", "HDMI-CEC", "Dante", "AES67", "CEC"];

export const manufacturers: Manufacturer[] = [
  { slug: "crestron", name: "Crestron", logoMark: "CR", website: "https://crestron.com", tier: "Gold", description: "Enterprise control & automation.", productCount: 6 },
  { slug: "extron", name: "Extron", logoMark: "EX", website: "https://extron.com", tier: "Gold", description: "Professional AV switching & distribution.", productCount: 5 },
  { slug: "qsc", name: "QSC", logoMark: "QS", website: "https://qsc.com", tier: "Gold", description: "Q-SYS ecosystem for audio, video, control.", productCount: 7 },
  { slug: "biamp", name: "Biamp", logoMark: "BI", website: "https://biamp.com", tier: "Silver", description: "Networked audio and conferencing.", productCount: 4 },
  { slug: "shure", name: "Shure", logoMark: "SH", website: "https://shure.com", tier: "Silver", description: "Microphones and wireless audio.", productCount: 3 },
  { slug: "samsung", name: "Samsung", logoMark: "SA", website: "https://samsung.com", tier: "Silver", description: "Commercial displays and signage.", productCount: 4 },
  { slug: "lg", name: "LG", logoMark: "LG", website: "https://lg.com", tier: "Silver", description: "Commercial displays and OLED.", productCount: 3 },
  { slug: "sony", name: "Sony", logoMark: "SO", website: "https://sony.com", tier: "Silver", description: "Professional cameras and displays.", productCount: 3 },
  { slug: "yamaha", name: "Yamaha", logoMark: "YA", website: "https://yamaha.com", tier: "Standard", description: "Audio processors and mixers.", productCount: 2 },
  { slug: "bose", name: "Bose Professional", logoMark: "BO", website: "https://pro.bose.com", tier: "Standard", description: "Commercial loudspeakers.", productCount: 2 },
  { slug: "atlona", name: "Atlona", logoMark: "AT", website: "https://atlona.com", tier: "Standard", description: "AV over IP and signal management.", productCount: 2 },
  { slug: "kramer", name: "Kramer", logoMark: "KR", website: "https://kramerav.com", tier: "Standard", description: "AV distribution and control.", productCount: 2 },
];

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=1200&q=80`;

export const products: Product[] = [
  {
    slug: "crestron-dm-nvx-360",
    name: "DM-NVX-360 Network AV Encoder/Decoder",
    sku: "DM-NVX-360",
    manufacturerSlug: "crestron",
    categorySlug: "video-switchers",
    protocols: ["TCP/IP", "UDP"],
    shortDescription: "4K60 4:4:4 HDR AV-over-IP endpoint with SDVoE interop.",
    longDescription:
      "The DM-NVX-360 is a high-performance network AV encoder/decoder engineered for enterprise AV-over-IP deployments. Delivers pristine 4K60 4:4:4 HDR across a standard 1Gb network with sub-frame latency.",
    specs: [
      { label: "Resolution", value: "4K60 4:4:4 HDR" },
      { label: "Latency", value: "< 1 frame" },
      { label: "Network", value: "1 GbE SFP / RJ-45" },
      { label: "Audio", value: "Dante / AES67" },
      { label: "Power", value: "PoE+ or 24V" },
      { label: "Operating Temp", value: "0–40°C" },
    ],
    supportStatus: "Fully Supported",
    firmware: "v2.4.1",
    lastUpdated: "2026-03-12",
    featured: true,
    downloads: [
      { label: "DM-NVX-360 Datasheet.pdf", type: "Datasheet", size: "2.1 MB", href: "#" },
      { label: "Driver Package v2.4.1", type: "Driver", size: "8.4 MB", href: "#" },
      { label: "Installation Manual", type: "Manual", size: "5.6 MB", href: "#" },
    ],
  },
  {
    slug: "qsc-core-110f",
    name: "Q-SYS Core 110f Integrated Processor",
    sku: "CORE-110F",
    manufacturerSlug: "qsc",
    categorySlug: "audio-processors",
    protocols: ["TCP/IP", "Dante", "AES67"],
    shortDescription: "All-in-one Q-SYS processor with onboard I/O for mid-size rooms.",
    longDescription:
      "Combines DSP, video, control, and VoIP telephony in a single 1RU unit. Designed for conference rooms, classrooms, and small auditoriums.",
    specs: [
      { label: "DSP Channels", value: "128 × 128" },
      { label: "Analog I/O", value: "8 in / 8 out" },
      { label: "Network", value: "Dual 1 GbE" },
      { label: "Rack Units", value: "1RU" },
      { label: "Firmware", value: "9.10" },
    ],
    supportStatus: "Fully Supported",
    firmware: "v9.10",
    lastUpdated: "2026-02-28",
    featured: true,
    downloads: [
      { label: "Core 110f Datasheet.pdf", type: "Datasheet", size: "1.8 MB", href: "#" },
      { label: "Q-SYS Designer Package", type: "Driver", size: "124 MB", href: "#" },
      { label: "Installation Guide", type: "Manual", size: "3.2 MB", href: "#" },
    ],
  },
  {
    slug: "extron-dtp3-t-202",
    name: "DTP3 T 202 Transmitter",
    sku: "DTP3-T-202",
    manufacturerSlug: "extron",
    categorySlug: "video-switchers",
    protocols: ["RS-232", "HDMI-CEC"],
    shortDescription: "HDBaseT 3.0 transmitter — 4K60 4:4:4 up to 100m.",
    longDescription:
      "Extends HDMI, audio, RS-232, bidirectional IR, and Ethernet over a single shielded twisted pair cable for 4K applications.",
    specs: [
      { label: "Resolution", value: "4K60 4:4:4" },
      { label: "Distance", value: "Up to 100m" },
      { label: "Control", value: "RS-232, IR, Ethernet" },
      { label: "HDCP", value: "2.3" },
    ],
    supportStatus: "Fully Supported",
    firmware: "v1.08",
    lastUpdated: "2026-01-15",
    featured: true,
    downloads: [
      { label: "DTP3 T 202 Datasheet.pdf", type: "Datasheet", size: "1.4 MB", href: "#" },
      { label: "Extron Driver Pack", type: "Driver", size: "6.1 MB", href: "#" },
    ],
  },
  {
    slug: "biamp-tesiraforte-x-400",
    name: "TesiraFORTÉ X 400 Audio DSP",
    sku: "TESIRAFORTE-X-400",
    manufacturerSlug: "biamp",
    categorySlug: "audio-processors",
    protocols: ["TCP/IP", "Dante", "AES67"],
    shortDescription: "Fixed I/O conferencing DSP with Parle beamtracking support.",
    longDescription: "Compact DSP with 12 channels of acoustic echo cancellation and native Dante.",
    specs: [
      { label: "AEC Channels", value: "12" },
      { label: "Analog I/O", value: "4 in / 4 out" },
      { label: "USB", value: "Soft codec" },
      { label: "Network", value: "Dante 64×64" },
    ],
    supportStatus: "Fully Supported",
    firmware: "v4.8",
    lastUpdated: "2026-03-02",
    featured: false,
    downloads: [
      { label: "TesiraFORTÉ X 400 Datasheet.pdf", type: "Datasheet", size: "2.3 MB", href: "#" },
      { label: "Tesira Software Suite", type: "Driver", size: "92 MB", href: "#" },
    ],
  },
  {
    slug: "shure-mxa920",
    name: "MXA920 Ceiling Array Microphone",
    sku: "MXA920",
    manufacturerSlug: "shure",
    categorySlug: "audio-processors",
    protocols: ["Dante", "TCP/IP"],
    shortDescription: "Automatic coverage ceiling array for enterprise conferencing.",
    longDescription: "Advanced IntelliMix DSP with Automatic Coverage technology — no zone setup required.",
    specs: [
      { label: "Pickup", value: "Automatic Coverage" },
      { label: "Network", value: "Dante / AES67" },
      { label: "Power", value: "PoE" },
      { label: "Form Factor", value: "24\" square or round" },
    ],
    supportStatus: "Fully Supported",
    firmware: "v7.2",
    lastUpdated: "2026-02-11",
    featured: true,
    downloads: [
      { label: "MXA920 Datasheet.pdf", type: "Datasheet", size: "1.9 MB", href: "#" },
      { label: "Designer Control Plugin", type: "Driver", size: "18 MB", href: "#" },
      { label: "User Guide", type: "Manual", size: "4.1 MB", href: "#" },
    ],
  },
  {
    slug: "samsung-qm75c",
    name: "QM75C 4K UHD Commercial Display",
    sku: "LH75QMCEBGCXGO",
    manufacturerSlug: "samsung",
    categorySlug: "displays",
    protocols: ["RS-232", "TCP/IP", "HDMI-CEC"],
    shortDescription: "75\" 4K UHD commercial display, 500 nits, 24/7 rated.",
    longDescription: "Premium signage display with built-in Tizen SoC and enterprise management.",
    specs: [
      { label: "Size", value: "75\"" },
      { label: "Resolution", value: "3840 × 2160" },
      { label: "Brightness", value: "500 cd/m²" },
      { label: "Operation", value: "24/7" },
    ],
    supportStatus: "Fully Supported",
    firmware: "T-HKTM",
    lastUpdated: "2026-01-08",
    featured: false,
    downloads: [
      { label: "QM75C Datasheet.pdf", type: "Datasheet", size: "3.4 MB", href: "#" },
      { label: "MagicInfo Driver", type: "Driver", size: "46 MB", href: "#" },
    ],
  },
  {
    slug: "sony-srg-x400",
    name: "SRG-X400 PTZ Camera",
    sku: "SRG-X400",
    manufacturerSlug: "sony",
    categorySlug: "cameras",
    protocols: ["TCP/IP", "RS-232", "UDP"],
    shortDescription: "4K 60p PTZ camera with 20x optical zoom.",
    longDescription: "Professional PTZ with IP streaming, NDI|HX upgrade path, and PoE+.",
    specs: [
      { label: "Resolution", value: "4K60" },
      { label: "Zoom", value: "20x optical" },
      { label: "Streaming", value: "IP / SDI / HDMI" },
      { label: "Power", value: "PoE+" },
    ],
    supportStatus: "Beta",
    firmware: "v2.1",
    lastUpdated: "2026-03-18",
    featured: false,
    downloads: [
      { label: "SRG-X400 Datasheet.pdf", type: "Datasheet", size: "2.7 MB", href: "#" },
      { label: "VISCA Driver Module", type: "Driver", size: "3.2 MB", href: "#" },
    ],
  },
  {
    slug: "lg-55uh7j-h",
    name: "55UH7J-H UHD Signage Display",
    sku: "55UH7J-H",
    manufacturerSlug: "lg",
    categorySlug: "displays",
    protocols: ["RS-232", "TCP/IP"],
    shortDescription: "55\" UHD signage with webOS 6.0 and 700 nits.",
    longDescription: "High-brightness signage for lobbies, retail, and corporate communication.",
    specs: [
      { label: "Size", value: "55\"" },
      { label: "Brightness", value: "700 cd/m²" },
      { label: "OS", value: "webOS 6.0" },
    ],
    supportStatus: "Fully Supported",
    firmware: "3.14",
    lastUpdated: "2026-02-02",
    featured: false,
    downloads: [
      { label: "55UH7J-H Datasheet.pdf", type: "Datasheet", size: "2.9 MB", href: "#" },
      { label: "LG SuperSign Driver", type: "Driver", size: "22 MB", href: "#" },
    ],
  },
];

export const downloadTypeIcon = {
  Datasheet: "file-text",
  Driver: "download",
  Manual: "book",
} as const;
