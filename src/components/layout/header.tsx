"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Search, Heart, Menu, X, ChevronDown } from "lucide-react";
import { CartDrawer } from "./cart-drawer";

const menLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Shoes", href: "/collections/mens?category=shoes" },
  { label: "Apparel", href: "/collections/mens?category=apparel" },
  { label: "Accessories", href: "/collections/mens?category=accessories" },
  { label: "Sale", href: "/collections/sale" },
];

const womenLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Shoes", href: "/collections/womens?category=shoes" },
  { label: "Apparel", href: "/collections/womens?category=apparel" },
  { label: "Accessories", href: "/collections/womens?category=accessories" },
  { label: "Sale", href: "/collections/sale" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"men" | "women" | null>(null);

  return (
    <>
      <header
        className="bg-white sticky top-0 z-50 border-b border-black/5"
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <nav className="mx-auto flex h-14 items-center px-4 lg:px-8 relative max-w-[1400px]">
          {/* Desktop nav left */}
          <div className="hidden lg:flex items-center gap-6 flex-1">
            <div className="relative" onMouseEnter={() => setActiveDropdown("men")}>
              <button className="flex items-center gap-0.5 text-sm font-medium tracking-wide hover:opacity-70 transition-opacity">
                MEN <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === "men" && (
                <div className="absolute top-full left-0 bg-white border border-black/5 shadow-lg py-4 px-6 min-w-[160px] z-50">
                  {menLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block py-1.5 text-sm hover:opacity-70 transition-opacity"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => setActiveDropdown("women")}>
              <button className="flex items-center gap-0.5 text-sm font-medium tracking-wide hover:opacity-70 transition-opacity">
                WOMEN <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {activeDropdown === "women" && (
                <div className="absolute top-full left-0 bg-white border border-black/5 shadow-lg py-4 px-6 min-w-[160px] z-50">
                  {womenLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block py-1.5 text-sm hover:opacity-70 transition-opacity"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/collections/sale" className="text-sm font-medium tracking-wide hover:opacity-70 transition-opacity">
              SALE
            </Link>
            <Link href="/collections/new-arrivals" className="text-sm font-medium tracking-wide hover:opacity-70 transition-opacity">
              NEW
            </Link>
            <Link href="/about" className="text-sm font-medium tracking-wide hover:opacity-70 transition-opacity">
              About
            </Link>
          </div>

          {/* Logo center */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight absolute left-1/2 -translate-x-1/2"
          >
            FashionHero
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-3 ml-auto">
            <button className="p-1.5 hover:opacity-70 transition-opacity" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/wishlist" className="p-1.5 hover:opacity-70 transition-opacity" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
            </Link>
            <button
              className="p-1.5 hover:opacity-70 transition-opacity relative"
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            {/* Mobile menu */}
            <button
              className="p-1.5 lg:hidden hover:opacity-70 transition-opacity"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-black/5 bg-white">
            <div className="px-4 py-4 space-y-1">
              <MobileGroup label="MEN" links={menLinks} onNavigate={() => setMobileOpen(false)} />
              <MobileGroup label="WOMEN" links={womenLinks} onNavigate={() => setMobileOpen(false)} />
              <Link
                href="/collections/sale"
                className="block py-2 text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                SALE
              </Link>
              <Link
                href="/collections/new-arrivals"
                className="block py-2 text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                NEW
              </Link>
              <Link
                href="/about"
                className="block py-2 text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function MobileGroup({
  label,
  links,
  onNavigate,
}: {
  label: string;
  links: { label: string; href: string }[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex items-center justify-between w-full py-2 text-sm font-medium"
        onClick={() => setOpen(!open)}
      >
        {label} <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pl-4 space-y-1 pb-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-1.5 text-sm text-muted-foreground"
              onClick={onNavigate}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
