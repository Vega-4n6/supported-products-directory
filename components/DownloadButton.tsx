"use client";
import { Product } from "@/data/cms";
import { trackDownload } from "@/lib/tracking";
import { Icon } from "./Icon";

export default function DownloadButton({
  product,
  file,
}: {
  product: Product;
  file: Product["downloads"][number];
}) {
  const iconName = file.type === "Datasheet" ? "file-text" : file.type === "Driver" ? "download" : "book";

  const handleClick = () => {
    trackDownload({
      productSlug: product.slug,
      productName: product.name,
      manufacturerSlug: product.manufacturerSlug,
      assetType: file.type,
      assetLabel: file.label,
    });
  };

  return (
    <a
      href={file.href}
      onClick={handleClick}
      data-track="download"
      data-product={product.slug}
      data-asset-type={file.type}
      className="group flex items-center gap-4 rounded-lg border border-border bg-white p-4 transition-all duration-200 hover:border-cta hover:shadow-card cursor-pointer"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-cta/10 text-cta">
        <Icon name={iconName} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-semibold text-primary truncate">{file.label}</span>
        <span className="block text-xs text-secondary">{file.type} · {file.size}</span>
      </span>
      <Icon name="download" className="w-5 h-5 text-secondary group-hover:text-cta transition-colors" />
    </a>
  );
}
