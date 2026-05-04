import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";

// Server Component — pure presentational
export function ProductCard({ product }: { product: Product }) {
  return <CardInner product={product} variant="carousel" />;
}

export function ProductCardGrid({ product }: { product: Product }) {
  return <CardInner product={product} variant="grid" />;
}

function CardInner({ product, variant }: { product: Product; variant: "carousel" | "grid" }) {
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
            <span className="hidden md:block absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-white/90 px-4 py-2 text-[10px] font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
              QUICK VIEW
            </span>
          </div>
        </Link>
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
