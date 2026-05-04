import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — FashionHero",
};

// Server Component
export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: 400 }}>
        <Image
          src="/images/hero/hero-3.jpg"
          alt="About FashionHero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full py-24 px-6 text-center text-white">
          <div>
            <p className="text-xs font-semibold tracking-widest mb-4 text-white/70">OUR STORY</p>
            <h1 className="text-4xl lg:text-5xl font-bold max-w-2xl leading-tight">
              Where sellers grow<br />and buyers discover.
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 md:px-8 lg:px-12 py-16 max-w-3xl mx-auto">
        <p className="text-base leading-relaxed text-muted-foreground mb-6">
          FashionHero started with a simple idea: fashion shouldn't be controlled by a few big players. We built a marketplace where independent designers compete alongside global brands — and where buyers discover styles they won't find anywhere else.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground">
          We give independent sellers and established brands the tools to reach millions of fashion-conscious shoppers. Every seller matters — from one-person studios to global brands.
        </p>
      </section>

      {/* Values */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-[#f5f4f1]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Empowering Sellers",
              desc: "We give independent sellers and established brands the tools to reach millions of fashion-conscious shoppers.",
            },
            {
              title: "Curated Discovery",
              desc: "Our marketplace brings together diverse styles and price points. We help buyers discover sellers they'd never find on their own.",
            },
            {
              title: "Fair For Everyone",
              desc: "Transparent fees, no hidden costs, equal visibility. We believe a marketplace works best when every seller has a fair shot.",
            },
          ].map((v) => (
            <div key={v.title}>
              <h3 className="text-sm font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 md:px-8 lg:px-12 py-16 max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-8">OUR JOURNEY</p>
        <div className="space-y-6">
          {[
            { year: "2020", text: "Founded with a vision: a fashion marketplace where every seller gets a fair chance." },
            { year: "2021", text: "Onboarded first 200 sellers. Launched with shoes, apparel, and accessories." },
            { year: "2023", text: "Reached 1,000 sellers and 500K active buyers. Introduced seller analytics." },
            { year: "2024", text: "Expanded to 4,000+ sellers. Revenue grew 28% year-over-year." },
            { year: "2025", text: "Facing new challenges: margins tightening, competition intensifying. Time to evolve." },
          ].map((item) => (
            <div key={item.year} className="flex gap-6">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground w-10 flex-shrink-0 pt-0.5">
                {item.year}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 lg:px-12 py-16 text-center bg-[#212121] text-white">
        <h2 className="text-3xl font-bold mb-4">Start exploring.</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          Get the latest on new products, exclusive deals, and more.
        </p>
        <Link href="/collections/new-arrivals">
          <Button className="bg-white text-[#212121] hover:bg-white/90 rounded-none px-10 h-12 text-xs font-semibold tracking-widest">
            SHOP NOW
          </Button>
        </Link>
      </section>
    </>
  );
}
