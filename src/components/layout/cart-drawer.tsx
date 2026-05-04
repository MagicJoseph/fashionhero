"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const FREE_SHIPPING_THRESHOLD = 299;

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Empty cart state — when items are added later, replace 0 with cart total
  const itemCount = 0;
  const cartTotal = 0;
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-sm bg-white p-0 flex flex-col">
        <SheetHeader className="px-5 py-4 border-b">
          <SheetTitle className="text-[14px] font-medium uppercase tracking-[0.8px] text-charcoal">
            CART ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {remaining > 0 && (
          <div className="px-5 py-3 bg-secondary text-center text-[11px] text-warm-gray border-b">
            Spend {remaining} zl more to earn free shipping!
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-12">
          <p className="text-center text-sm text-warm-gray mb-6">
            Your cart is empty. Start shopping!
          </p>
          <div className="flex flex-col gap-3 max-w-[220px] mx-auto">
            <Link href="/collections/womens" onClick={onClose}>
              <Button className="w-full bg-charcoal text-white hover:bg-charcoal/90 rounded-full h-10 text-[11px] font-medium uppercase tracking-[0.6px]">
                SHOP WOMENS
              </Button>
            </Link>
            <Link href="/collections/mens" onClick={onClose}>
              <Button
                variant="outline"
                className="w-full border-charcoal text-charcoal hover:bg-charcoal hover:text-white rounded-full h-10 text-[11px] font-medium uppercase tracking-[0.6px]"
              >
                SHOP MENS
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
