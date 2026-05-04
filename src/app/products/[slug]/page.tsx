import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCardGrid } from "@/components/domain/product-card";
import { Star } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: `${product.name} — FashionHero` };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

function deliveryWindow(): string {
  const start = new Date();
  start.setDate(start.getDate() + 5);
  const end = new Date(start);
  end.setDate(end.getDate() + 2);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(start)} - ${fmt(end)}`;
}

// Server Component
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== slug && p.gender === product.gender)
    .slice(0, 5);

  const breadcrumb =
    product.gender === "womens" ? "Women's Fashion" : "Men's Fashion";
  const breadcrumbHref =
    product.gender === "womens" ? "/collections/womens" : "/collections/mens";
  const sizesLabel =
    product.gender === "womens" ? "WOMEN'S SIZES" : "MEN'S SIZES";

  const galleryImages = product.images ?? [product.image];

  return (
    <>
      <div className="px-4 md:px-8 lg:px-12 pt-6">
        <nav className="text-[11px] text-warm-gray mb-6">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span className="mx-1">/</span>
          <Link href={breadcrumbHref} className="hover:text-charcoal">
            {breadcrumb}
          </Link>
          <span className="mx-1">/</span>
          <span className="text-charcoal/60">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Image gallery: large + 3 thumbnails */}
          <div>
            <div className="relative aspect-square bg-secondary mb-2">
              <Image
                src={galleryImages[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.slice(1, 4).map((img, i) => (
                  <div key={i} className="relative aspect-square bg-secondary">
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 33vw, 16vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl font-normal text-charcoal mb-1">
              {product.name}
            </h1>
            <p className="text-[11px] text-warm-gray mb-3">
              Sold by{" "}
              <span className="text-charcoal/70">{product.seller}</span>
              {product.sellerTier === "Pro" && (
                <span className="inline-block ml-1 text-[9px] bg-charcoal/10 text-charcoal/70 px-1 py-0.5 rounded uppercase tracking-wide">
                  Pro
                </span>
              )}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? "fill-charcoal text-charcoal"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-warm-gray">({product.reviews})</span>
            </div>

            <p className="text-xl font-medium mb-2">{product.price} zl</p>
            {product.inStock ? (
              <p className="text-xs text-green-700 mb-5">
                In Stock — Ready to Ship
              </p>
            ) : (
              <p className="text-xs text-red-600 mb-5">Out of Stock</p>
            )}

            {/* Color swatches */}
            <div className="mb-5">
              <p className="text-[11px] text-warm-gray mb-2">
                {product.colors[0]?.name}
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    title={c.name}
                    aria-label={c.name}
                    className="w-7 h-7 rounded-full border border-black/20 hover:border-charcoal transition-colors"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes — 4x2 grid */}
            <div className="mb-6">
              <p className="text-[11px] font-medium uppercase tracking-wide text-charcoal mb-2">
                {sizesLabel}
              </p>
              <div className="grid grid-cols-4 gap-2 max-w-xs">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className="h-10 text-sm border border-border hover:border-charcoal transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full bg-charcoal text-white hover:bg-charcoal/90 rounded-none h-12 text-[12px] font-medium tracking-widest uppercase mb-3">
              SELECT A SIZE
            </Button>

            <div className="text-[11px] text-warm-gray mb-6 space-y-1">
              <p>Free Shipping on Orders over 299 zl</p>
              <p>Estimated delivery: {deliveryWindow()}</p>
              <p>Easy Returns</p>
            </div>

            <Accordion
              type="multiple"
              defaultValue={["description"]}
              className="border-t"
            >
              {[
                {
                  id: "description",
                  label: "DESCRIPTION",
                  content: product.description ?? "—",
                },
                {
                  id: "features",
                  label: "FEATURES",
                  content: product.features?.length
                    ? product.features.map((f) => `• ${f}`).join("\n")
                    : "—",
                },
                {
                  id: "materials",
                  label: "MATERIALS",
                  content: product.materials ?? product.material ?? "—",
                },
                {
                  id: "care",
                  label: "CARE",
                  content: product.care ?? "—",
                },
              ].map((tab) => (
                <AccordionItem
                  key={tab.id}
                  value={tab.id}
                  className="border-b"
                >
                  <AccordionTrigger className="text-[11px] font-medium uppercase tracking-widest py-4">
                    {tab.label}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-warm-gray leading-relaxed whitespace-pre-line pb-4">
                    {tab.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* You May Also Like — 5-up grid */}
      {related.length > 0 && (
        <section className="px-4 md:px-8 lg:px-12 pb-16">
          <h2 className="text-xl font-normal text-charcoal mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {related.map((p) => (
              <ProductCardGrid key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
