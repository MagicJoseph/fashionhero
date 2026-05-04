"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { HeroSlide } from "@/lib/data";

const ROTATE_MS = 5000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const slide = slides[active];

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 560 }}>
      {slides.map((s, i) => (
        <Image
          key={s.id}
          src={s.image}
          alt={s.title}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex items-end h-full min-h-[560px] px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.6px] text-white/70 mb-3">
            {slide.subtitle}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-[0.6px] text-white mb-8 leading-tight">
            {slide.title}
          </h1>
          <div className="flex gap-3 flex-wrap">
            {slide.ctaLinks.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                className="inline-flex items-center justify-center px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.6px] text-white border border-white rounded-full hover:bg-white hover:text-charcoal transition-all duration-200"
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === active ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play carousel" : "Pause carousel"}
          className="ml-2 p-1 text-white/60 hover:text-white transition-colors"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
    </section>
  );
}
