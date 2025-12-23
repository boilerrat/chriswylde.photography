"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Cart, CartLine } from "@/lib/cart";
import {
  getCartId,
  setCartId,
  clearCartId,
  createCart,
  addToCart,
  getCart,
  updateCartLines,
  removeCartLines,
} from "@/lib/cart";

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  getItemCount: () => number;
  getTotalPrice: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    const cartId = getCartId();
    if (!cartId) {
      setCart(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const fetchedCart = await getCart(cartId);
      setCart(fetchedCart);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load cart";
      // Don't show error in development if Shopify isn't configured
      if (process.env.NODE_ENV === "development" && errorMessage.includes("required")) {
        clearCartId();
        setCart(null);
        setIsLoading(false);
        return;
      }
      setError(errorMessage);
      clearCartId();
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = useCallback(
    async (variantId: string, quantity: number = 1) => {
      try {
        setError(null);
        const cartId = getCartId();

        let updatedCart: Cart;
        if (cartId) {
          updatedCart = await addToCart(cartId, variantId, quantity);
        } else {
          updatedCart = await createCart(variantId, quantity);
        }

        setCart(updatedCart);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to add item to cart";
        setError(errorMessage);
        // Don't throw in development if Shopify isn't configured
        if (process.env.NODE_ENV === "development" && errorMessage.includes("required")) {
          console.warn("Shopify not configured. Cart features disabled.");
          return;
        }
        throw err;
      }
    },
    []
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      const cartId = getCartId();
      if (!cartId || !cart) {
        throw new Error("Cart not found");
      }

      try {
        setError(null);
        const updatedCart = await updateCartLines(cartId, lineId, quantity);
        setCart(updatedCart);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update item");
        throw err;
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      const cartId = getCartId();
      if (!cartId || !cart) {
        throw new Error("Cart not found");
      }

      try {
        setError(null);
        const updatedCart = await removeCartLines(cartId, [lineId]);
        setCart(updatedCart);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to remove item");
        throw err;
      }
    },
    [cart]
  );

  const getItemCount = useCallback(() => {
    if (!cart) return 0;
    return cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  }, [cart]);

  const getTotalPrice = useCallback(() => {
    if (!cart) return "$0.00";
    return `${cart.cost.totalAmount.currencyCode === "CAD" ? "C$" : "$"}${parseFloat(cart.cost.totalAmount.amount).toFixed(2)}`;
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addItem,
        updateItem,
        removeItem,
        refreshCart,
        getItemCount,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

