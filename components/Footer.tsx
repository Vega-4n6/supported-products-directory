import Link from "next/link";
import { Icon } from "./Icon";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-white">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white">
              <Icon name="shield" className="w-5 h-5" />
            </span>
            <span>Supported<span className="text-cta">.</span>Products</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-secondary">
            The authoritative directory of AV products officially supported by our integration platform. Browse drivers, datasheets, and compatibility guides.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Browse</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/directory" className="text-primary hover:text-cta cursor-pointer">All products</Link></li>
            <li><Link href="/directory?filter=manufacturer" className="text-primary hover:text-cta cursor-pointer">By manufacturer</Link></li>
            <li><Link href="/directory?filter=category" className="text-primary hover:text-cta cursor-pointer">By category</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Partners</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/why-supported" className="text-primary hover:text-cta cursor-pointer">Why supported matters</Link></li>
            <li><Link href="/get-supported" className="text-primary hover:text-cta cursor-pointer">Get your product supported</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-5 flex flex-col sm:flex-row justify-between text-xs text-secondary">
          <p>© {new Date().getFullYear()} Supported Products Directory · Prototype</p>
          <p>Built for review — CMS-first on Webflow</p>
        </div>
      </div>
    </footer>
  );
}
