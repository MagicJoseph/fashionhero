"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const SIZES = [5, 6, 7, 8, 9, 10, 11, 12, 13];
const PRODUCT_TYPES = ["Shoes", "Apparel", "Accessories"];
const MATERIALS = ["Mesh", "Leather", "Knit", "Canvas", "Synthetic", "Cotton", "Silk", "Nylon"];
const SELLERS = ["UrbanEdge", "Bella Donna"];

export type FilterState = {
  sizes: number[];
  types: string[];
  materials: string[];
  sellers: string[];
  maxPrice: number;
};

export function CollectionFilters({
  onChange,
}: {
  onChange: (filters: FilterState) => void;
}) {
  const [sizes, setSizes] = useState<number[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [sellers, setSellers] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000);

  function toggleItem<T>(list: T[], setList: (v: T[]) => void, item: T) {
    const next = list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
    setList(next);
    onChange({ sizes: item instanceof Number ? (next as number[]) : sizes, types, materials, sellers, maxPrice });
  }

  function update(patch: Partial<FilterState>) {
    const next = { sizes, types, materials, sellers, maxPrice, ...patch };
    if (patch.sizes !== undefined) setSizes(patch.sizes);
    if (patch.types !== undefined) setTypes(patch.types);
    if (patch.materials !== undefined) setMaterials(patch.materials);
    if (patch.sellers !== undefined) setSellers(patch.sellers);
    if (patch.maxPrice !== undefined) setMaxPrice(patch.maxPrice);
    onChange(next);
  }

  return (
    <div className="w-56 flex-shrink-0">
      <h3 className="text-xs font-semibold tracking-widest mb-4">Filters</h3>
      <Accordion type="multiple" defaultValue={["size", "price", "type"]} className="space-y-0">
        <AccordionItem value="size" className="border-b border-border">
          <AccordionTrigger className="text-xs font-semibold tracking-wide py-3">Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-1.5 pb-3">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => update({ sizes: sizes.includes(s) ? sizes.filter((x) => x !== s) : [...sizes, s] })}
                  className={`w-8 h-8 text-xs border transition-colors ${
                    sizes.includes(s) ? "bg-[#212121] text-white border-[#212121]" : "border-border hover:border-[#212121]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b border-border">
          <AccordionTrigger className="text-xs font-semibold tracking-wide py-3">Price</AccordionTrigger>
          <AccordionContent>
            <div className="pb-4 pr-2">
              <Slider
                min={0}
                max={1000}
                step={50}
                value={[maxPrice]}
                onValueChange={([v]) => update({ maxPrice: v })}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 zł</span>
                <span>{maxPrice} zł</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="type" className="border-b border-border">
          <AccordionTrigger className="text-xs font-semibold tracking-wide py-3">Product Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pb-3">
              {PRODUCT_TYPES.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Checkbox
                    id={`type-${t}`}
                    checked={types.includes(t)}
                    onCheckedChange={() => update({ types: types.includes(t) ? types.filter((x) => x !== t) : [...types, t] })}
                  />
                  <Label htmlFor={`type-${t}`} className="text-xs cursor-pointer">{t}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="material" className="border-b border-border">
          <AccordionTrigger className="text-xs font-semibold tracking-wide py-3">Material</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pb-3">
              {MATERIALS.map((m) => (
                <div key={m} className="flex items-center gap-2">
                  <Checkbox
                    id={`mat-${m}`}
                    checked={materials.includes(m)}
                    onCheckedChange={() => update({ materials: materials.includes(m) ? materials.filter((x) => x !== m) : [...materials, m] })}
                  />
                  <Label htmlFor={`mat-${m}`} className="text-xs cursor-pointer">{m}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="seller" className="border-b border-border">
          <AccordionTrigger className="text-xs font-semibold tracking-wide py-3">Seller</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pb-3">
              {SELLERS.map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <Checkbox
                    id={`seller-${s}`}
                    checked={sellers.includes(s)}
                    onCheckedChange={() => update({ sellers: sellers.includes(s) ? sellers.filter((x) => x !== s) : [...sellers, s] })}
                  />
                  <Label htmlFor={`seller-${s}`} className="text-xs cursor-pointer">{s}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
