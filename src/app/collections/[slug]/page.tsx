import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCollection, collectionMeta } from "@/lib/data";
import { CollectionView } from "@/components/domain/collection-view";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = collectionMeta[slug];
  if (!meta) return {};
  return { title: `${meta.title} — FashionHero`, description: meta.description };
}

export function generateStaticParams() {
  return Object.keys(collectionMeta).map((slug) => ({ slug }));
}

// Server Component
export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const meta = collectionMeta[slug];
  if (!meta) notFound();

  const products = getProductsByCollection(slug);

  return (
    <>
      {/* Hero banner with title overlay */}
      {meta.heroImage && (
        <section
          className="relative w-full overflow-hidden"
          style={{ height: 280 }}
        >
          <Image
            src={meta.heroImage}
            alt={meta.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide">
              {meta.title}
            </h1>
          </div>
        </section>
      )}

      <div className="px-4 md:px-8 lg:px-12 pt-6 pb-2">
        <nav className="text-[11px] text-warm-gray mb-2">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span className="mx-1">/</span>
          <span>{meta.title}</span>
        </nav>
      </div>
      <CollectionView products={products} />
    </>
  );
}
