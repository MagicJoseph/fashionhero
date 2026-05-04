"use client";

import { useState } from "react";
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
  const items = active === "new" ? newArrivals : bestSellers;

  return (
    <div>
      <div className="px-4 md:px-8 lg:px-12 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Our Favorites</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActive("new")}
            className={`text-xs font-semibold tracking-widest px-4 py-2 border transition-colors ${
              active === "new"
                ? "bg-[#212121] text-white border-[#212121]"
                : "bg-transparent text-[#212121] border-[#212121] hover:bg-[#212121]/5"
            }`}
          >
            NEW ARRIVALS
          </button>
          <button
            onClick={() => setActive("best")}
            className={`text-xs font-semibold tracking-widest px-4 py-2 border transition-colors ${
              active === "best"
                ? "bg-[#212121] text-white border-[#212121]"
                : "bg-transparent text-[#212121] border-[#212121] hover:bg-[#212121]/5"
            }`}
          >
            BEST SELLERS
          </button>
        </div>
      </div>

      <div className="relative px-4 md:px-8 lg:px-12">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
