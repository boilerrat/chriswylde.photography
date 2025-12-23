"use client";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState, useMemo } from "react";
import { ImageBlock } from "./mdx/image-block";
import { TextBlock } from "./mdx/text-block";
import { Divider } from "./mdx/divider";
import { TwoUp } from "./mdx/two-up";
import { MDXProvider } from "@/contexts/mdx-context";
import type { PrintProduct } from "@/lib/schema";

interface MDXWrapperProps {
  content: string;
  printProduct: PrintProduct | null;
}

export function MDXWrapper({ content, printProduct }: MDXWrapperProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);

  const components = useMemo(
    () => ({
      ImageBlock,
      TextBlock,
      Divider,
      TwoUp,
    }),
    []
  );

  useEffect(() => {
    serialize(content).then(setMdxSource);
  }, [content]);

  if (!mdxSource) {
    return null;
  }

  return (
    <MDXProvider printProduct={printProduct}>
      <MDXRemote {...mdxSource} components={components} />
    </MDXProvider>
  );
}

