"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { PrintProduct, PrintSize } from "@/lib/schema";

interface BuyPrintButtonProps {
  printProduct: PrintProduct;
  imageAlt: string;
}

export function BuyPrintButton({ printProduct, imageAlt }: BuyPrintButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  
  // If only one size/variant, skip the dialog and add directly
  const isSingleVariant = printProduct.sizes.length === 1;
  const singleVariant = isSingleVariant ? printProduct.sizes[0] : null;

  const handleAddToCart = async (variantId: string) => {
    try {
      setIsAdding(true);
      await addItem(variantId, 1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to add to cart";
      if (errorMessage.includes("required")) {
        alert("Shopify is not configured. Please set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variables.");
      } else {
        alert("Failed to add to cart. Please try again.");
      }
    } finally {
      setIsAdding(false);
    }
  };

  // Single variant: direct add to cart button
  if (isSingleVariant && singleVariant) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="mt-2 w-full"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleAddToCart(singleVariant.shopifyVariantId);
        }}
        disabled={isAdding}
      >
        {isAdding ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buy Print - C${singleVariant.price.toFixed(2)}
          </>
        )}
      </Button>
    );
  }

  // Multiple variants: show dialog with size selection
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<PrintSize | null>(printProduct.sizes[0] || null);

  const handleDialogAddToCart = async () => {
    if (!selectedSize) return;
    await handleAddToCart(selectedSize.shopifyVariantId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 w-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Print
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Print Size</DialogTitle>
          <DialogDescription>Choose a size for {imageAlt}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <RadioGroup
            value={selectedSize?.name || ""}
            onValueChange={(value) => {
              const size = printProduct.sizes.find((s) => s.name === value);
              setSelectedSize(size || null);
            }}
          >
            {printProduct.sizes.map((size) => (
              <div key={size.name} className="flex items-center space-x-2">
                <RadioGroupItem value={size.name} id={size.name} />
                <Label htmlFor={size.name} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{size.name}</span>
                      {size.dimensions && (
                        <span className="text-sm text-slate-500 ml-2">({size.dimensions})</span>
                      )}
                    </div>
                    <span className="font-semibold">
                      C${size.price.toFixed(2)}
                    </span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Button
            onClick={handleDialogAddToCart}
            disabled={!selectedSize || isAdding}
            className="w-full"
          >
            {isAdding ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

