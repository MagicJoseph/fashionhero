import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Wishlist — FashionHero" };

// Server Component
export default function WishlistPage() {
  return (
    <div className="px-4 md:px-8 lg:px-12 py-16 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <Heart className="w-12 h-12 text-muted-foreground mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Your Wishlist</h1>
      <p className="text-muted-foreground mb-8 text-sm">
        You haven't saved any items yet.
      </p>
      <Link href="/collections/new-arrivals">
        <Button className="bg-[#212121] text-white hover:bg-[#333] rounded-none px-8 h-12 text-xs font-semibold tracking-widest">
          SHOP NEW ARRIVALS
        </Button>
      </Link>
    </div>
  );
}
