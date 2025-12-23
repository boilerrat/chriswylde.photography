"use client";

import { shopifyClient, CREATE_CART_MUTATION, ADD_TO_CART_MUTATION, GET_CART_QUERY, UPDATE_CART_LINES_MUTATION, REMOVE_CART_LINES_MUTATION } from "./shopify";

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      images: Array<{
        url: string;
        altText: string | null;
      }>;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: CartLine[];
}

const CART_ID_KEY = "shopify_cart_id";

export function getCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CART_ID_KEY);
}

export function setCartId(cartId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_ID_KEY, cartId);
}

export function clearCartId(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_ID_KEY);
}

export async function createCart(variantId: string, quantity: number = 1): Promise<Cart> {
  const response = await shopifyClient.request(CREATE_CART_MUTATION, {
    variables: {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      },
    },
  });

  if (response.data?.cartCreate?.userErrors?.length > 0) {
    throw new Error(response.data.cartCreate.userErrors[0].message);
  }

  const cart = response.data?.cartCreate?.cart;
  if (!cart) {
    throw new Error("Failed to create cart");
  }

  setCartId(cart.id);
  return transformCart(cart);
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<Cart> {
  const response = await shopifyClient.request(ADD_TO_CART_MUTATION, {
    variables: {
      cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity,
        },
      ],
    },
  });

  if (response.data?.cartLinesAdd?.userErrors?.length > 0) {
    throw new Error(response.data.cartLinesAdd.userErrors[0].message);
  }

  const cart = response.data?.cartLinesAdd?.cart;
  if (!cart) {
    throw new Error("Failed to add to cart");
  }

  return transformCart(cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const response = await shopifyClient.request(GET_CART_QUERY, {
    variables: {
      id: cartId,
    },
  });

  const cart = response.data?.cart;
  if (!cart) {
    return null;
  }

  return transformCart(cart);
}

export async function updateCartLines(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const response = await shopifyClient.request(UPDATE_CART_LINES_MUTATION, {
    variables: {
      cartId,
      lines: [
        {
          id: lineId,
          quantity,
        },
      ],
    },
  });

  if (response.data?.cartLinesUpdate?.userErrors?.length > 0) {
    throw new Error(response.data.cartLinesUpdate.userErrors[0].message);
  }

  const cart = response.data?.cartLinesUpdate?.cart;
  if (!cart) {
    throw new Error("Failed to update cart");
  }

  return transformCart(cart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<Cart> {
  const response = await shopifyClient.request(REMOVE_CART_LINES_MUTATION, {
    variables: {
      cartId,
      lineIds,
    },
  });

  if (response.data?.cartLinesRemove?.userErrors?.length > 0) {
    throw new Error(response.data.cartLinesRemove.userErrors[0].message);
  }

  const cart = response.data?.cartLinesRemove?.cart;
  if (!cart) {
    throw new Error("Failed to remove from cart");
  }

  return transformCart(cart);
}

function transformCart(cart: any): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    cost: cart.cost,
    lines: cart.lines.edges.map((edge: any) => ({
      id: edge.node.id,
      quantity: edge.node.quantity,
      merchandise: {
        id: edge.node.merchandise.id,
        title: edge.node.merchandise.title,
        price: edge.node.merchandise.price,
        product: {
          title: edge.node.merchandise.product.title,
          images: edge.node.merchandise.product.images.edges.map((imgEdge: any) => ({
            url: imgEdge.node.url,
            altText: imgEdge.node.altText,
          })),
        },
      },
    })),
  };
}

