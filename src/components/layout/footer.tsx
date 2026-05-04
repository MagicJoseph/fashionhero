import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

// Server Component
export function Footer() {
  return (
    <footer className="bg-[#333] text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
        {/* Newsletter + social */}
        <div className="mb-12 pb-10 border-b border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-semibold tracking-widest mb-3">FOLLOW THE FLOCK</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                TikTok
              </Link>
              <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                X/Twitter
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-widest mb-3">JOIN THE FLOCK</h3>
            <div className="flex gap-2 max-w-sm">
              <Input
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-none h-10 flex-1"
              />
              <Button className="bg-white text-[#333] hover:bg-white/90 rounded-none h-10 px-5 text-xs font-semibold tracking-wider">
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="text-lg font-bold mb-4 block">
              FashionHero
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              A marketplace where independent sellers and global brands meet fashion-conscious shoppers.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-widest mb-4">HELP</h3>
            <ul className="space-y-2">
              {["FAQ/Contact Us", "Returns/Exchanges", "Shipping Info", "Order Status"].map((l) => (
                <li key={l}>
                  <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-widest mb-4">SHOP</h3>
            <ul className="space-y-2">
              {[
                { label: "Men's Shoes", href: "/collections/mens?category=shoes" },
                { label: "Women's Shoes", href: "/collections/womens?category=shoes" },
                { label: "New Arrivals", href: "/collections/new-arrivals" },
                { label: "Sale", href: "/collections/sale" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-widest mb-4">COMPANY</h3>
            <ul className="space-y-2">
              {[
                { label: "Our Story", href: "/about" },
                { label: "Our Materials", href: "#" },
                { label: "Sell on FashionHero", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-white/40">
          © 2026 FashionHero, Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
