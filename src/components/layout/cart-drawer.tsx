"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-sm bg-white p-0">
        <SheetHeader className="flex items-center justify-between px-4 py-4 border-b">
          <SheetTitle className="text-base font-semibold tracking-wide">CART (0)</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="text-center py-12">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <p className="text-sm text-muted-foreground">Start shopping!</p>
          </div>
        </div>
        <div className="px-4 py-3 bg-[#f5f4f1] text-center text-xs text-muted-foreground border-t">
          Spend 299 zł more to earn free shipping!
        </div>
        <div className="px-4 py-4">
          <Button className="w-full bg-[#212121] text-white hover:bg-[#333] rounded-none h-12 text-sm tracking-wider">
            CHECKOUT
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
