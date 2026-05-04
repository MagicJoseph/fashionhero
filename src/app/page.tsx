import Image from "next/image";
import Link from "next/link";
import { ProductCarousel } from "@/components/domain/product-carousel";
import { HeroCarousel } from "@/components/domain/hero-carousel";
import { products, heroSlides } from "@/lib/data";

// Server Component
export default function HomePage() {
  const newArrivals = products.filter((p) => p.badge === "NEW").slice(0, 12);
  const bestSellers = products
    .filter((p) => p.badge === "BESTSELLER" || p.rating >= 4.7)
    .slice(0, 12);

  const cloudRunner = products.find((p) => p.slug === "cloud-runner");
  const breezeSlipOn = products.find((p) => p.slug === "breeze-slip-on");

  type Tile = {
    label: string;
    image: string;
    ctaLinks: { label: string; href: string }[];
    bg?: string;
  };

  const categoryTiles: Tile[] = [
    {
      label: "New Arrivals",
      image: "/images/hero/hero-2.jpg",
      ctaLinks: [{ label: "SHOP NOW", href: "/collections/new-arrivals" }],
      bg: "linear-gradient(145deg, #c4b59a 0%, #a89279 50%, #8a7d6b 100%)",
    },
    {
      label: "Men's",
      image: "/images/hero/collection-hero-1.jpg",
      ctaLinks: [
        { label: "SHOP NOW", href: "/collections/mens" },
      ],
      bg: "linear-gradient(145deg, #4a5568 0%, #2d3748 50%, #1a202c 100%)",
    },
    {
      label: "Women's",
      image: "/images/hero/collection-hero-2.jpg",
      ctaLinks: [
        { label: "SHOP NOW", href: "/collections/womens" },
      ],
      bg: "linear-gradient(145deg, #d4a8a0 0%, #b8857c 50%, #8a5d56 100%)",
    },
    {
      label: "Best Sellers",
      image: "/images/hero/hero-1.jpg",
      ctaLinks: [{ label: "SHOP NOW", href: "/collections/best-sellers" }],
      bg: "linear-gradient(145deg, #6b5b4a 0%, #4a3d31 50%, #2d2419 100%)",
    },
  ];

  const collectionTiles = [
    {
      label: "Trail Collection",
      image: "/images/products/product-3.jpg",
      bg: "linear-gradient(170deg, #3d5a3d 0%, #5c7a5c 40%, #8a9a7a 100%)",
      ctaLinks: [
        { label: "SHOP MEN", href: "/collections/mens" },
        { label: "SHOP WOMEN", href: "/collections/womens" },
      ],
    },
    {
      label: "Everyday Essentials",
      image: "/images/products/product-4.jpg",
      bg: "linear-gradient(170deg, #6b5b4a 0%, #a89279 40%, #c4b59a 100%)",
      ctaLinks: [
        { label: "SHOP MEN", href: "/collections/mens" },
        { label: "SHOP WOMEN", href: "/collections/womens" },
      ],
    },
    {
      label: "Sale",
      image: "/images/products/product-8.jpg",
      bg: "linear-gradient(170deg, #8a3d3d 0%, #b85c5c 40%, #d49090 100%)",
      ctaLinks: [
        { label: "SHOP MEN", href: "/collections/sale" },
        { label: "SHOP WOMEN", href: "/collections/sale" },
      ],
    },
  ];

  return (
    <>
      {/* 1. Hero carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* 2. Category tiles (4-up) */}
      <section className="px-4 md:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryTiles.map((tile) => (
            <div
              key={tile.label}
              className="relative flex flex-col items-center justify-end overflow-hidden group"
              style={{ background: tile.bg, aspectRatio: "3 / 4" }}
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="relative z-10 text-center pb-8 px-4">
                <h3 className="text-xl font-normal text-white mb-4 tracking-wide">
                  {tile.label}
                </h3>
                <div className="flex gap-3 justify-center">
                  {tile.ctaLinks.map((cta) => (
                    <Link
                      key={cta.label + cta.href}
                      href={cta.href}
                      className="inline-flex items-center justify-center px-5 py-2 text-[11px] font-medium uppercase tracking-[0.6px] text-white border border-white rounded-full hover:bg-white hover:text-charcoal transition-all duration-200"
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Our Favorites — product carousel */}
      <ProductCarousel newArrivals={newArrivals} bestSellers={bestSellers} />

      {/* 4. Editorial 2-up — Easy, Breezy MVP */}
      <section className="px-4 md:px-8 lg:px-12 py-10">
        <h2 className="text-[40px] font-normal text-charcoal text-center mb-10 leading-tight">
          Your Easy, Breezy MVP
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cloudRunner && (
            <EditorialCard
              eyebrow="NATURALLY EASY"
              title="Cloud Runner"
              body="Our lightest shoe ever. Knit from recycled materials for all-day ease."
              href={`/products/${cloudRunner.slug}`}
              image={cloudRunner.image}
              bg="linear-gradient(160deg, #8a7d6b 0%, #c4b59a 40%, #e8dfd0 100%)"
            />
          )}
          {breezeSlipOn && (
            <EditorialCard
              eyebrow="LIGHT ON YOUR FEET"
              title="Breeze Slip-On"
              body="Slip in and go. Eucalyptus fiber keeps things cool, naturally."
              href={`/products/${breezeSlipOn.slug}`}
              image={breezeSlipOn.image}
              bg="linear-gradient(160deg, #5c6b4f 0%, #8a9a7a 40%, #b5c4a8 100%)"
            />
          )}
        </div>
      </section>

      {/* 5. Editorial 3-up collections */}
      <section className="px-4 md:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collectionTiles.map((tile) => (
            <div
              key={tile.label}
              className="relative flex flex-col items-center justify-end overflow-hidden group"
              style={{ background: tile.bg, aspectRatio: "3 / 4" }}
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="relative z-10 text-center pb-8 px-4">
                <h3 className="text-xl font-normal text-white mb-4 tracking-wide">
                  {tile.label}
                </h3>
                <div className="flex gap-3 justify-center">
                  {tile.ctaLinks.map((cta, idx) => (
                    <Link
                      key={`${cta.label}-${idx}`}
                      href={cta.href}
                      className="inline-flex items-center justify-center px-5 py-2 text-[11px] font-medium uppercase tracking-[0.6px] text-white border border-white rounded-full hover:bg-white hover:text-charcoal transition-all duration-200"
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Value props 3-up */}
      <section className="px-4 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          {[
            {
              eyebrow: "DISCOVERY",
              title: "Thousands Of Sellers, One Search",
              desc: "From top brands to independent designers - find exactly what you're looking for across thousands of curated sellers.",
            },
            {
              eyebrow: "TRUST",
              title: "Verified Sellers, Real Reviews",
              desc: "Every seller on FashionHero is vetted. Real customer reviews and our Pro seller program help you shop with confidence.",
            },
            {
              eyebrow: "VARIETY",
              title: "From Streetwear To Sustainable",
              desc: "Premium brands, vintage finds, handmade originals, everyday basics. Whatever your style, it's here.",
            },
          ].map((vp) => (
            <div key={vp.title}>
              <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray mb-2">
                {vp.eyebrow}
              </p>
              <h3 className="text-lg font-normal text-charcoal mb-3">
                {vp.title}
              </h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                {vp.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function EditorialCard({
  eyebrow,
  title,
  body,
  href,
  image,
  bg,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  image: string;
  bg: string;
}) {
  return (
    <div
      className="relative overflow-hidden group"
      style={{ background: bg, minHeight: 520 }}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-white/70 mb-2">
          {eyebrow}
        </p>
        <h3 className="text-2xl font-normal text-white mb-2">{title}</h3>
        <p className="text-sm text-white/80 mb-6 max-w-xs leading-relaxed">
          {body}
        </p>
        <Link
          href={href}
          className="inline-flex items-center justify-center px-5 py-2 text-[11px] font-medium uppercase tracking-[0.6px] text-white border border-white rounded-full hover:bg-white hover:text-charcoal transition-all duration-200"
        >
          EXPLORE MORE
        </Link>
      </div>
    </div>
  );
}
