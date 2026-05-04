"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Search, Heart, User, Menu, X } from "lucide-react";
import { CartDrawer } from "./cart-drawer";

const navLinks = [
  { label: "MEN", href: "/collections/mens" },
  { label: "WOMEN", href: "/collections/womens" },
  { label: "SALE", href: "/collections/sale" },
  { label: "NEW", href: "/collections/new-arrivals" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 z-50 border-b border-black/5">
        <nav className="mx-auto flex h-14 items-center px-4 lg:px-8 relative">
          <button
            className="lg:hidden p-1 mr-3"
            aria-label="Open menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="mr-8">
            <span className="text-xl font-semibold italic tracking-tight text-charcoal">
              FashionHero
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 flex-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[12px] font-medium uppercase tracking-[0.5px] text-charcoal hover:opacity-60 transition-opacity"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/about"
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
              className="hidden sm:block p-1 hover:opacity-60 transition-opacity"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              href="/account/login"
              className="hidden sm:flex p-1 hover:opacity-60 transition-opacity items-center justify-center"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              className="p-1 hover:opacity-60 transition-opacity relative"
              aria-label="View Cart"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="lg:hidden border-t border-black/5">
            <div className="px-4 py-4 space-y-1 bg-white">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block py-2 text-[12px] font-medium uppercase tracking-[0.5px]"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
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
