"use client";

import { useState } from "react";
import { CollectionFilters, type FilterState } from "./collection-filters";
import { ProductCardGrid } from "./product-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product } from "@/lib/data";

export function CollectionView({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<FilterState>({
    sizes: [], types: [], materials: [], sellers: [], maxPrice: 1000,
  });
  const [sort, setSort] = useState("featured");

  const filtered = products.filter((p) => {
    if (filters.sizes.length > 0 && !filters.sizes.some((s) => p.sizes.includes(s))) return false;
    if (filters.types.length > 0 && !filters.types.map((t) => t.toLowerCase()).includes(p.category)) return false;
    if (filters.materials.length > 0 && p.material && !filters.materials.includes(p.material)) return false;
    if (filters.sellers.length > 0 && !filters.sellers.includes(p.seller)) return false;
    if (p.price > filters.maxPrice) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "newest") return (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0);
    return 0;
  });

  return (
    <div className="flex gap-8 px-4 md:px-8 lg:px-12 py-8">
      {/* Filters sidebar */}
      <aside className="hidden lg:block">
        <CollectionFilters onChange={setFilters} />
      </aside>

      {/* Products */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-muted-foreground">{sorted.length} products</p>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-40 h-8 text-xs rounded-none border-border">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured" className="text-xs">Featured</SelectItem>
              <SelectItem value="newest" className="text-xs">Newest</SelectItem>
              <SelectItem value="price-asc" className="text-xs">Price: Low to High</SelectItem>
              <SelectItem value="price-desc" className="text-xs">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sorted.map((p) => (
            <ProductCardGrid key={p.slug} product={p} />
          ))}
        </div>
        {sorted.length === 0 && (
          <p className="text-sm text-muted-foreground py-16 text-center">
            No products match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
