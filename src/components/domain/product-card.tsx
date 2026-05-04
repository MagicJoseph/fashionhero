"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return <CardInner product={product} variant="carousel" />;
}

export function ProductCardGrid({ product }: { product: Product }) {
  return <CardInner product={product} variant="grid" />;
}

function CardInner({ product, variant }: { product: Product; variant: "carousel" | "grid" }) {
  const [wished, setWished] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);

  const wrapperClass =
    variant === "carousel"
      ? "group min-w-[220px] max-w-[220px] flex-shrink-0"
      : "group";
  const imgSizes =
    variant === "carousel"
      ? "220px"
      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";
  const primaryColor = product.colors[0];
  const radialBg = primaryColor
    ? `radial-gradient(ellipse at 50% 60%, ${primaryColor.hex}33 0%, ${primaryColor.hex}11 40%, #ece9e2 70%)`
    : undefined;

  return (
    <div className={wrapperClass}>
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <div
            className="relative aspect-square overflow-hidden mb-3"
            style={{ background: radialBg }}
          >
            {product.badge && (
              <span className="absolute top-3 left-3 z-10 text-[10px] font-medium uppercase tracking-wider bg-white/90 px-2 py-1">
                {product.badge}
              </span>
            )}
            <Image
              src={product.image}
              alt={`${product.name} - ${primaryColor?.name ?? ""}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={imgSizes}
            />

            <Dialog open={quickOpen} onOpenChange={setQuickOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setQuickOpen(true);
                  }}
                  className="hidden md:block absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-white/90 px-4 py-2 text-[10px] font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                >
                  QUICK VIEW
                </button>
              </DialogTrigger>
              <QuickViewModal product={product} onClose={() => setQuickOpen(false)} />
            </Dialog>
          </div>
        </Link>

        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          onClick={(e) => {
            e.preventDefault();
            setWished((w) => !w);
          }}
          className="hidden md:flex absolute top-3 right-3 z-20 bg-white/90 rounded-full p-1.5 hover:bg-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 items-center justify-center"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              wished ? "fill-charcoal text-charcoal" : "text-charcoal"
            }`}
          />
        </button>
      </div>

      <Link href={`/products/${product.slug}`} className="block">
        <h3 className="text-[12px] font-medium uppercase tracking-[0.5px] mb-0.5">
          {product.name}
        </h3>
        <p className="text-[12px] text-warm-gray mb-0.5">{primaryColor?.name}</p>
        <p className="text-[11px] text-warm-gray/70 mb-1">
          Sold by{" "}
          <span className="text-charcoal/60">{product.seller}</span>
          {product.sellerTier === "Pro" && (
            <span className="inline-block ml-1 text-[9px] bg-charcoal/10 text-charcoal/70 px-1 py-0.5 rounded uppercase tracking-wide">
              Pro
            </span>
          )}
        </p>
      </Link>
      <div className="flex gap-1.5 mb-1.5">
        {product.colors.map((c) => (
          <span
            key={c.name}
            aria-label={c.name}
            className="w-3 h-3 rounded-full border border-black/10"
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[14px] font-medium">{product.price} zl</span>
        {product.originalPrice && (
          <span className="text-[12px] text-warm-gray line-through">
            {product.originalPrice} zl
          </span>
        )}
      </div>
    </div>
  );
}

function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const sizesLabel =
    product.gender === "womens" ? "WOMEN'S SIZES" : "MEN'S SIZES";
  const primary = product.colors[0];

  return (
    <DialogContent
      className="max-w-3xl p-0 gap-0 overflow-hidden"
      showCloseButton
    >
      <DialogTitle className="sr-only">Quick view: {product.name}</DialogTitle>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="relative aspect-square bg-secondary"
          style={{
            background: primary
              ? `radial-gradient(ellipse at 50% 60%, ${primary.hex}33 0%, ${primary.hex}11 40%, #ece9e2 70%)`
              : undefined,
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 z-10 text-[10px] font-medium uppercase tracking-wider bg-white/90 px-2 py-1">
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-6 md:p-8 flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
          <div>
            <h2 className="text-2xl font-normal text-charcoal mb-1">
              {product.name}
            </h2>
            <p className="text-[11px] text-warm-gray">
              Sold by{" "}
              <span className="text-charcoal/70">{product.seller}</span>
              {product.sellerTier === "Pro" && (
                <span className="inline-block ml-1 text-[9px] bg-charcoal/10 text-charcoal/70 px-1 py-0.5 rounded uppercase tracking-wide">
                  Pro
                </span>
              )}
            </p>
          </div>

          <p className="text-lg font-medium">{product.price} zl</p>

          {product.description && (
            <p className="text-sm text-warm-gray leading-relaxed">
              {product.description}
            </p>
          )}

          <div>
            <p className="text-[11px] text-warm-gray mb-2">{primary?.name}</p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  aria-label={c.name}
                  className="w-7 h-7 rounded-full border border-black/20 hover:border-charcoal transition-colors"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-charcoal mb-2">
              {sizesLabel}
            </p>
            <div className="grid grid-cols-4 gap-2 max-w-xs">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="h-10 text-sm border border-border hover:border-charcoal transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-2">
            <button
              type="button"
              className="w-full bg-charcoal text-white hover:bg-charcoal/90 h-12 text-[12px] font-medium uppercase tracking-widest"
            >
              SELECT A SIZE
            </button>
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="text-[11px] text-center text-warm-gray hover:text-charcoal underline underline-offset-2"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
