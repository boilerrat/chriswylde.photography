"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function CartPage() {
  const { cart, isLoading, error, updateItem, removeItem, getTotalPrice } = useCart();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Cart</h1>
        <div className="text-center py-12">
          <p className="text-slate-600 mb-4">Your cart is empty</p>
          <Link href="/projects">
            <Button>Browse Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Cart</h1>

      <div className="space-y-6 mb-8">
        {cart.lines.map((line) => {
          const imageUrl = line.merchandise.product.images[0]?.url || "";
          const imageAlt = line.merchandise.product.images[0]?.altText || line.merchandise.product.title;

          return (
            <div
              key={line.id}
              className="flex gap-4 p-4 border rounded-lg"
            >
              {imageUrl && (
                <div className="relative w-24 h-24 flex-shrink-0 bg-slate-100 rounded overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{line.merchandise.product.title}</h3>
                <p className="text-sm text-slate-600 mb-2">{line.merchandise.title}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        if (line.quantity > 1) {
                          updateItem(line.id, line.quantity - 1);
                        }
                      }}
                      disabled={line.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{line.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateItem(line.id, line.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="ml-auto">
                    <p className="font-semibold">
                      C${(parseFloat(line.merchandise.price.amount) * line.quantity).toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                    onClick={() => removeItem(line.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold">Total</span>
          <span className="text-2xl font-bold">{getTotalPrice()}</span>
        </div>
        <a href={cart.checkoutUrl} target="_blank" rel="noopener noreferrer">
          <Button className="w-full" size="lg">
            Checkout
          </Button>
        </a>
        <p className="text-sm text-slate-600 mt-4 text-center">
          Prints are fulfilled by{" "}
          <a href="https://graination.ca" target="_blank" rel="noopener noreferrer" className="underline">
            Graination
          </a>
        </p>
      </div>
    </div>
  );
}

