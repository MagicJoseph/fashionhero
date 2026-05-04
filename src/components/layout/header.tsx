"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Search, Heart, User, Menu, X } from "lucide-react";
import { CartDrawer } from "./cart-drawer";

type MenuColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

const megaMenu: Record<"MEN" | "WOMEN", MenuColumn[]> = {
  MEN: [
    {
      heading: "SHOES",
      links: [
        { label: "Runners", href: "/collections/mens?type=runner" },
        { label: "Walkers", href: "/collections/mens?type=walker" },
        { label: "Trainers", href: "/collections/mens?type=trainer" },
        { label: "Slip-Ons", href: "/collections/mens?type=slip-on" },
        { label: "All Men's Shoes", href: "/collections/mens" },
      ],
    },
    {
      heading: "APPAREL",
      links: [
        { label: "Tees", href: "/collections/mens?type=tee" },
        { label: "Hoodies", href: "/collections/mens?type=hoodie" },
        { label: "Joggers", href: "/collections/mens?type=pant" },
        { label: "Jackets", href: "/collections/mens?type=jacket" },
        { label: "All Men's Apparel", href: "/collections/mens" },
      ],
    },
    {
      heading: "SOCKS",
      links: [
        { label: "Ankle Socks", href: "/collections/mens?type=ankle" },
        { label: "Crew Socks", href: "/collections/mens?type=crew" },
        { label: "No-Show", href: "/collections/mens?type=no-show" },
        { label: "Performance", href: "/collections/mens?type=performance" },
        { label: "All Men's Socks", href: "/collections/mens" },
      ],
    },
    {
      heading: "ACCESSORIES",
      links: [
        { label: "Bags", href: "/collections/mens?type=bag" },
        { label: "Beanies", href: "/collections/mens?type=beanie" },
        { label: "Caps", href: "/collections/mens?type=cap" },
        { label: "Insoles", href: "/collections/mens?type=insole" },
      ],
    },
  ],
  WOMEN: [
    {
      heading: "SHOES",
      links: [
        { label: "Runners", href: "/collections/womens?type=runner" },
        { label: "Walkers", href: "/collections/womens?type=walker" },
        { label: "Trainers", href: "/collections/womens?type=trainer" },
        { label: "Flats", href: "/collections/womens?type=flat" },
        { label: "Slip-Ons", href: "/collections/womens?type=slip-on" },
        { label: "All Women's Shoes", href: "/collections/womens" },
      ],
    },
    {
      heading: "APPAREL",
      links: [
        { label: "Tees", href: "/collections/womens?type=tee" },
        { label: "Hoodies", href: "/collections/womens?type=hoodie" },
        { label: "Joggers", href: "/collections/womens?type=pant" },
        { label: "Cardigans", href: "/collections/womens?type=cardigan" },
        { label: "All Women's Apparel", href: "/collections/womens" },
      ],
    },
    {
      heading: "SOCKS",
      links: [
        { label: "Ankle Socks", href: "/collections/womens?type=ankle" },
        { label: "Crew Socks", href: "/collections/womens?type=crew" },
        { label: "No-Show", href: "/collections/womens?type=no-show" },
        { label: "Performance", href: "/collections/womens?type=performance" },
        { label: "All Women's Socks", href: "/collections/womens" },
      ],
    },
    {
      heading: "ACCESSORIES",
      links: [
        { label: "Bags", href: "/collections/womens?type=bag" },
        { label: "Beanies", href: "/collections/womens?type=beanie" },
        { label: "Caps", href: "/collections/womens?type=cap" },
        { label: "Insoles", href: "/collections/womens?type=insole" },
      ],
    },
  ],
};

const topNav: Array<{
  label: string;
  href: string;
  hasDropdown: boolean;
}> = [
  { label: "MEN", href: "/collections/mens", hasDropdown: true },
  { label: "WOMEN", href: "/collections/womens", hasDropdown: true },
  { label: "SALE", href: "/collections/sale", hasDropdown: false },
  { label: "NEW", href: "/collections/new-arrivals", hasDropdown: false },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"MEN" | "WOMEN" | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const closeMega = () => setOpenMenu(null);

  return (
    <>
      <header
        className="bg-white sticky top-0 z-50 border-b border-black/5"
        onMouseLeave={closeMega}
      >
        <nav className="mx-auto flex h-14 items-center px-4 lg:px-8 relative">
          <button
            className="lg:hidden p-1 mr-3"
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="mr-8" onClick={closeMega}>
            <span className="text-xl font-semibold italic tracking-tight text-charcoal">
              FashionHero
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 flex-1">
            {topNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => {
                  if (item.hasDropdown) setOpenMenu(item.label as "MEN" | "WOMEN");
                  else closeMega();
                }}
                onClick={closeMega}
                className="text-[12px] font-medium uppercase tracking-[0.5px] text-charcoal hover:opacity-60 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/about"
              onClick={closeMega}
              className="hidden lg:block text-[12px] text-charcoal hover:opacity-60 transition-opacity"
            >
              About
            </Link>
            <button
              className="p-1 hover:opacity-60 transition-opacity"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/wishlist"
              onClick={closeMega}
              className="hidden sm:block p-1 hover:opacity-60 transition-opacity"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              href="/account/login"
              onClick={closeMega}
              className="hidden sm:flex p-1 hover:opacity-60 transition-opacity items-center justify-center"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              className="p-1 hover:opacity-60 transition-opacity relative"
              aria-label="View Cart"
              onClick={() => {
                closeMega();
                setCartOpen(true);
              }}
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Desktop mega-menu dropdown */}
        {openMenu && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-white border-t border-black/5 shadow-lg z-50"
            onMouseEnter={() => setOpenMenu(openMenu)}
            onMouseLeave={closeMega}
          >
            <div className="max-w-7xl mx-auto px-8 py-8">
              <div className="grid grid-cols-4 gap-10">
                {megaMenu[openMenu].map((col) => (
                  <div key={col.heading}>
                    <h3 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal mb-3">
                      {col.heading}
                    </h3>
                    <ul className="space-y-2">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            onClick={closeMega}
                            className="text-[13px] text-charcoal/70 hover:text-charcoal transition-colors"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-black/5">
            <div className="px-4 py-4 space-y-1 bg-white">
              {topNav.map((item) => {
                const cols =
                  item.label === "MEN" || item.label === "WOMEN"
                    ? megaMenu[item.label]
                    : null;
                if (!cols) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-[12px] font-medium uppercase tracking-[0.5px]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                const isOpen = mobileExpanded === item.label;
                return (
                  <div key={item.label}>
                    <button
                      className="flex items-center justify-between w-full py-2 text-[12px] font-medium uppercase tracking-[0.5px]"
                      onClick={() =>
                        setMobileExpanded(isOpen ? null : item.label)
                      }
                    >
                      {item.label}
                      <span className="text-[12px] text-warm-gray">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pl-4 pb-3 space-y-4">
                        {cols.map((col) => (
                          <div key={col.heading}>
                            <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-charcoal mb-2">
                              {col.heading}
                            </p>
                            <ul className="space-y-1.5">
                              {col.links.map((l) => (
                                <li key={l.label}>
                                  <Link
                                    href={l.href}
                                    className="block text-[13px] text-charcoal/70"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link
                href="/about"
                className="block py-2 text-[12px] font-medium uppercase tracking-[0.5px]"
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
