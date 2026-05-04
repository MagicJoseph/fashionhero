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

// Server Component
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== slug && p.gender === product.gender)
    .slice(0, 8);

  return (
    <>
      <div className="px-4 md:px-8 lg:px-12 pt-6">
        <nav className="text-xs text-muted-foreground mb-6">
          <Link href="/">Home</Link> /{" "}
          <Link href={`/collections/${product.gender === "womens" ? "womens" : "mens"}`}>
            {product.gender === "womens" ? "Women's Shoes" : "Men's Shoes"}
          </Link>{" "}
          / <span>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Images */}
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 relative aspect-square bg-[#f5f4f1]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {(product.images ?? [product.image, product.image]).slice(1, 3).map((img, i) => (
              <div key={i} className="relative aspect-square bg-[#f5f4f1]">
                <Image src={img} alt={`${product.name} view ${i + 2}`} fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>

          {/* Details */}
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Sold by {product.seller}
              {product.sellerTier === "Pro" && (
                <span className="ml-1 text-[10px] font-semibold text-amber-600">Pro</span>
              )}
            </p>
            <h1 className="text-2xl font-bold mb-1">{product.name}</h1>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-[#212121] text-[#212121]" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>

            <p className="text-xl font-semibold mb-1">{product.price} zł</p>
            {product.inStock ? (
              <p className="text-xs text-green-700 mb-4">In Stock — Ready to Ship</p>
            ) : (
              <p className="text-xs text-red-600 mb-4">Out of Stock</p>
            )}

            {/* Color */}
            <div className="mb-4">
              <p className="text-xs font-semibold tracking-wide mb-2">Color: {product.colors[0]?.name}</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    title={c.name}
                    className="w-7 h-7 rounded-full border-2 border-border hover:border-[#212121] transition-colors"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-wide mb-2">
                {product.gender === "womens" ? "WOMEN'S SIZES" : "MEN'S SIZES"}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className="w-10 h-10 text-sm border border-border hover:border-[#212121] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full bg-[#212121] text-white hover:bg-[#333] rounded-none h-12 text-xs font-semibold tracking-widest mb-3">
              SELECT A SIZE
            </Button>
            <p className="text-xs text-center text-muted-foreground mb-6">
              Free Shipping on Orders over 299 zł
            </p>

            {/* Accordion tabs */}
            <Accordion type="multiple" defaultValue={["description"]} className="border-t">
              {[
                { id: "description", label: "DESCRIPTION", content: product.description ?? "No description available." },
                { id: "features", label: "FEATURES", content: product.features?.join("\n") ?? "—" },
                { id: "materials", label: "MATERIALS", content: product.material ?? "—" },
                { id: "care", label: "CARE", content: "Spot clean only. Do not machine wash." },
              ].map((tab) => (
                <AccordionItem key={tab.id} value={tab.id} className="border-b">
                  <AccordionTrigger className="text-xs font-semibold tracking-widest py-4">
                    {tab.label}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line pb-4">
                    {tab.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {related.length > 0 && (
        <section className="px-4 md:px-8 lg:px-12 pb-16">
          <h2 className="text-xl font-semibold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCardGrid key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
