"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group min-w-[220px] max-w-[220px] flex-shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden mb-3 bg-[#f5f4f1]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="220px"
          />
          {product.badge && (
            <span
              className={`absolute top-2 left-2 text-[10px] font-semibold tracking-widest px-2 py-0.5 ${
                product.badge === "SALE"
                  ? "bg-red-600 text-white"
                  : "bg-[#212121] text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          {hovered && (
            <button
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-[#212121] text-[10px] font-semibold tracking-widest px-4 py-2 hover:bg-[#212121] hover:text-white transition-colors whitespace-nowrap"
              onClick={(e) => e.preventDefault()}
            >
              QUICK VIEW
            </button>
          )}
        </div>
      </Link>
      <Link href={`/products/${product.slug}`} className="block">
        <p className="text-[11px] text-muted-foreground mb-0.5">
          {product.colors[0]?.name}
        </p>
        <p className="text-xs text-muted-foreground mb-1">
          Sold by {product.seller}
          {product.sellerTier === "Pro" && (
            <span className="ml-1 text-[10px] font-semibold text-amber-600">Pro</span>
          )}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{product.price} zł</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {product.originalPrice} zł
            </span>
          )}
        </div>
        <p className="text-sm font-medium mt-0.5">{product.name}</p>
      </Link>
    </div>
  );
}

// Grid variant — for collection pages
export function ProductCardGrid({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden mb-3 bg-[#f5f4f1]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.badge && (
            <span
              className={`absolute top-2 left-2 text-[10px] font-semibold tracking-widest px-2 py-0.5 ${
                product.badge === "SALE"
                  ? "bg-red-600 text-white"
                  : "bg-[#212121] text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          {hovered && (
            <button
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-[#212121] text-[10px] font-semibold tracking-widest px-4 py-2 hover:bg-[#212121] hover:text-white transition-colors whitespace-nowrap"
              onClick={(e) => e.preventDefault()}
            >
              QUICK VIEW
            </button>
          )}
        </div>
      </Link>
      <Link href={`/products/${product.slug}`} className="block">
        <p className="text-xs text-muted-foreground mb-1">
          Sold by {product.seller}
          {product.sellerTier === "Pro" && (
            <span className="ml-1 text-[10px] font-semibold text-amber-600">Pro</span>
          )}
        </p>
        <p className="text-sm font-medium">{product.name}</p>
        <p className="text-[11px] text-muted-foreground mb-1">{product.colors[0]?.name}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{product.price} zł</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {product.originalPrice} zł
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
