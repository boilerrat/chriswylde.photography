"use client";

import React, { createContext, useContext } from "react";
import type { PrintProduct } from "@/lib/schema";

interface MDXContextType {
  printProduct: PrintProduct | null;
}

const MDXContext = createContext<MDXContextType | undefined>(undefined);

export function MDXProvider({
  children,
  printProduct,
}: {
  children: React.ReactNode;
  printProduct: PrintProduct | null;
}) {
  return <MDXContext.Provider value={{ printProduct }}>{children}</MDXContext.Provider>;
}

export function useMDX() {
  const context = useContext(MDXContext);
  return context || { printProduct: null };
}

