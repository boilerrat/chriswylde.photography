"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMDX } from "@/contexts/mdx-context";
import { ShopifyBuyButton } from "@/components/shopify-buy-button";

interface ImageBlockProps {
  url: string;
  alt: string;
  caption?: string;
  layout: "full" | "bleed" | "inset" | "twoUp";
  showBuyButton?: boolean;
  buyButtonCode?: string;
}

export function ImageBlock({ url, alt, caption, layout, showBuyButton, buyButtonCode: propBuyButtonCode }: ImageBlockProps) {
  const { printProduct } = useMDX();
  const layoutClasses = {
    full: "w-full",
    bleed: "w-full -mx-4 md:-mx-8 lg:-mx-16",
    inset: "w-full max-w-2xl mx-auto",
    twoUp: "w-full md:w-1/2",
  };

  // Use prop buyButtonCode if provided, otherwise fall back to context
  const buyButtonCode = propBuyButtonCode || printProduct?.buyButtonCode;
  
  // Only show buy button if explicitly enabled for this image and we have a buyButtonCode
  const shouldShowBuyButton = showBuyButton && buyButtonCode;

  return (
    <figure className={cn("my-8", layoutClasses[layout])}>
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={url}
          alt={alt}
          fill
          className="object-cover"
          sizes={
            layout === "twoUp"
              ? "(max-width: 768px) 100vw, 50vw"
              : layout === "inset"
              ? "(max-width: 768px) 100vw, 672px"
              : "100vw"
          }
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-slate-600 text-center">
          {caption}
        </figcaption>
      )}
      {shouldShowBuyButton && buyButtonCode && (
        <div className="flex justify-center">
          <ShopifyBuyButton buyButtonCode={buyButtonCode} />
        </div>
      )}
    </figure>
  );
}

