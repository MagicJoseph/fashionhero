"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/data";

export function ProductCarousel({
  newArrivals,
  bestSellers,
}: {
  newArrivals: Product[];
  bestSellers: Product[];
}) {
  const [active, setActive] = useState<"new" | "best">("new");
  const trackRef = useRef<HTMLDivElement>(null);
  const items = active === "new" ? newArrivals : bestSellers;

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 480, behavior: "smooth" });
  };

  return (
    <section className="py-12">
      <h2 className="text-[40px] font-normal text-charcoal text-center mb-2">
        Our Favorites
      </h2>
      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setActive("new")}
          className={`text-[12px] font-medium uppercase tracking-[0.5px] pb-1 border-b-2 transition-colors ${
            active === "new"
              ? "border-charcoal text-charcoal"
              : "border-transparent text-warm-gray hover:text-charcoal"
          }`}
        >
          NEW ARRIVALS
        </button>
        <button
          onClick={() => setActive("best")}
          className={`text-[12px] font-medium uppercase tracking-[0.5px] pb-1 border-b-2 transition-colors ${
            active === "best"
              ? "border-charcoal text-charcoal"
              : "border-transparent text-warm-gray hover:text-charcoal"
          }`}
        >
          BEST SELLERS
        </button>
      </div>

      <div className="relative px-4 md:px-8 lg:px-12">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="absolute left-2 top-1/3 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm hidden md:flex items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="absolute right-2 top-1/3 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm hidden md:flex items-center justify-center"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        >
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
