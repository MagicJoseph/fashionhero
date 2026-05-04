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
      <div className="px-4 md:px-8 lg:px-12 pt-8 pb-2">
        <nav className="text-xs text-muted-foreground mb-3">
          <span>Home</span> / <span>{meta.title}</span>
        </nav>
        <h1 className="text-3xl font-bold">{meta.title}</h1>
      </div>
      <CollectionView products={products} />
    </>
  );
}
