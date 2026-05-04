import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCarousel } from "@/components/domain/product-carousel";
import { products } from "@/lib/data";

// Server Component — runs on the server
export default function HomePage() {
  const newArrivals = products.filter((p) => p.badge === "NEW").slice(0, 12);
  const bestSellers = products.filter((p) => p.badge === "BESTSELLER").slice(0, 12);
  const featuredProduct = products.find((p) => p.slug === "breeze-slip-on");

  return (
    <>
      {/* 1. Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: "85vh", minHeight: 480 }}>
        <Image
          src="/images/hero/hero-1.jpg"
          alt="Your Style. Their Craft."
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex items-end pb-16 px-6 lg:px-12">
          <div className="max-w-xl text-white">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              Your Style.<br />Their Craft.
            </h1>
            <div className="flex gap-3">
              <Link href="/collections/mens">
                <Button className="bg-white text-[#212121] hover:bg-white/90 rounded-none px-8 h-12 text-xs font-semibold tracking-widest">
                  SHOP MEN
                </Button>
              </Link>
              <Link href="/collections/womens">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-none px-8 h-12 text-xs font-semibold tracking-widest bg-transparent">
                  SHOP WOMEN
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. New Arrivals category tiles */}
      <section className="px-4 md:px-8 lg:px-12 py-10">
        <h3 className="text-xs font-semibold tracking-widest mb-4 text-muted-foreground">New Arrivals</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Men's", href: "/collections/mens", img: "/images/hero/hero-1.jpg" },
            { label: "Women's", href: "/collections/womens", img: "/images/hero/hero-2.jpg" },
            { label: "Best Sellers", href: "/collections/best-sellers", img: "/images/hero/hero-3.jpg" },
            { label: "Sale", href: "/collections/sale", img: "/images/hero/hero-4.jpg" },
          ].map((tile) => (
            <Link key={tile.href} href={tile.href}>
              <div className="relative overflow-hidden group" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={tile.img}
                  alt={tile.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-sm font-semibold tracking-wide">{tile.label}</h3>
                  <span className="text-[11px] tracking-widest">SHOP NOW →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Our Favorites carousel */}
      <section className="py-12">
        <ProductCarousel newArrivals={newArrivals} bestSellers={bestSellers} />
      </section>

      {/* 4. Editorial 2-up */}
      <section className="px-4 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Trail Collection", sub: "Built for the outdoors.", href: "/collections/mens", img: "/images/hero/hero-2.jpg" },
            { label: "Everyday Essentials", sub: "The pieces you'll reach for every day.", href: "/collections/womens", img: "/images/hero/hero-3.jpg" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="relative overflow-hidden group" style={{ aspectRatio: "4/5" }}>
                <Image
                  src={item.img}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-xl font-semibold mb-1">{item.label}</h3>
                  <p className="text-sm text-white/80 mb-4">{item.sub}</p>
                  <span className="text-xs font-semibold tracking-widest border-b border-white pb-0.5">
                    SHOP NOW
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Editorial 3-up */}
      <section className="px-4 md:px-8 lg:px-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Thousands Of Sellers, One Search", href: "/collections/new-arrivals", img: "/images/hero/hero-4.jpg" },
            { label: "Verified Sellers, Real Reviews", href: "/collections/new-arrivals", img: "/images/hero/hero-1.jpg" },
            { label: "From Streetwear To Sustainable", href: "/collections/new-arrivals", img: "/images/hero/hero-2.jpg" },
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <div className="relative overflow-hidden group" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={item.img}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center">
                  <h3 className="text-sm font-semibold">{item.label}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Featured product */}
      {featuredProduct && (
        <section className="px-4 md:px-8 lg:px-12 py-16 bg-[#f5f4f1]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square bg-[#ece9e2]">
              <Image
                src={featuredProduct.image}
                alt={featuredProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-2">
                YOUR EASY, BREEZY MVP
              </p>
              <h2 className="text-3xl font-bold mb-3">{featuredProduct.name}</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {featuredProduct.description}
              </p>
              <p className="text-xl font-semibold mb-6">{featuredProduct.price} zł</p>
              <Link href={`/products/${featuredProduct.slug}`}>
                <Button className="bg-[#212121] text-white hover:bg-[#333] rounded-none px-8 h-12 text-xs font-semibold tracking-widest">
                  EXPLORE MORE
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7. Value props */}
      <section className="px-4 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          {[
            {
              title: "Thousands Of Sellers, One Search",
              desc: "Browse from independent designers, emerging brands and global names — all in one place.",
            },
            {
              title: "Verified Sellers, Real Reviews",
              desc: "Every seller is vetted. Every review is from a verified buyer.",
            },
            {
              title: "From Streetwear To Sustainable",
              desc: "Whether you're into performance wear, luxury basics, or eco-conscious fashion — we've got it.",
            },
          ].map((vp) => (
            <div key={vp.title}>
              <h3 className="text-sm font-semibold mb-2">{vp.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{vp.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
