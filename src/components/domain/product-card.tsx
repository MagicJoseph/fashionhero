"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Heart, X } from "lucide-react";
import type { Product, ColorOption } from "@/lib/data";

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
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickOpen(true);
              }}
              className="hidden md:block absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-white/90 px-4 py-2 text-[10px] font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
            >
              QUICK VIEW
            </button>
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
              wished ? "fill-red-500 text-red-500" : "text-charcoal"
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

      {quickOpen && (
        <QuickViewModal product={product} onClose={() => setQuickOpen(false)} />
      )}
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
  const [color, setColor] = useState<ColorOption>(product.colors[0]);
  const [size, setSize] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC to close + lock body scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const sizesLabel =
    product.gender === "womens" ? "WOMEN'S SIZES" : "MEN'S SIZES";
  const ctaLabel = size ? `ADD TO CART - ${product.price} zl` : "SELECT A SIZE";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 outline-none"
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-4 right-4 p-1 hover:opacity-60 transition-opacity z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div
            className="relative aspect-square"
            style={{
              background: `radial-gradient(ellipse at 50% 60%, ${color.hex}33 0%, ${color.hex}11 40%, #ece9e2 70%)`,
            }}
          >
            <Image
              src={color.image ?? product.image}
              alt={`${product.name} - ${color.name}`}
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

          <div className="p-6 flex flex-col gap-4">
            <h2 className="text-xl font-normal text-charcoal">{product.name}</h2>

            <div className="flex items-center gap-3">
              <span className="text-lg font-medium text-charcoal">
                {product.price} zl
              </span>
              {product.originalPrice && (
                <span className="text-sm text-warm-gray line-through">
                  {product.originalPrice} zl
                </span>
              )}
            </div>

            <div>
              <p className="text-[11px] text-warm-gray mb-2">{color.name}</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c)}
                    title={c.name}
                    aria-label={c.name}
                    aria-pressed={color.name === c.name}
                    className={`w-7 h-7 rounded-full border transition-colors ${
                      color.name === c.name
                        ? "border-charcoal"
                        : "border-black/20 hover:border-charcoal"
                    }`}
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
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`h-10 text-sm border transition-colors ${
                      size === s
                        ? "border-charcoal bg-charcoal text-white"
                        : "border-border hover:border-charcoal"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              disabled={!size}
              onClick={onClose}
              className="w-full py-3.5 bg-charcoal text-white text-[12px] font-medium uppercase tracking-[0.6px] rounded-full hover:bg-charcoal/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {ctaLabel}
            </button>

            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="text-center text-[12px] font-medium uppercase tracking-[0.5px] text-charcoal underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              VIEW FULL DETAILS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
