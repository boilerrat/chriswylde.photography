"use client";

import { useEffect, useRef } from "react";

interface ShopifyBuyButtonProps {
  buyButtonCode: string;
}

// Track loaded component IDs globally to prevent duplicates across all instances
const loadedComponentIds = new Set<string>();
const initializationPromises = new Map<string, Promise<void>>();

export function ShopifyBuyButton({ buyButtonCode }: ShopifyBuyButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || !buyButtonCode) {
      return;
    }

    // Check if code contains placeholder comments
    if (buyButtonCode.includes("Replace this with") || (buyButtonCode.includes("<!--") && buyButtonCode.includes("Get it from"))) {
      return;
    }

    // Extract div ID from the code
    const divIdMatch = buyButtonCode.match(/id=['"]([^'"]+)['"]/);
    const divId = divIdMatch ? divIdMatch[1] : null;

    if (!divId) {
      return;
    }

    // Check if this component already exists in the DOM
    if (document.getElementById(divId) && document.getElementById(divId) !== containerRef.current.querySelector(`#${divId}`)) {
      // Component already exists elsewhere, don't initialize
      return;
    }

    // Prevent duplicate initialization - check both the Set and if we're already initializing
    if (loadedComponentIds.has(divId) || initializedRef.current) {
      return;
    }

    // Mark as initializing
    initializedRef.current = true;
    loadedComponentIds.add(divId);

    // Clear container first
    containerRef.current.innerHTML = "";

    // Create the div element
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = buyButtonCode.trim();
    const buyButtonDiv = tempDiv.querySelector(`div#${divId}`) || tempDiv.querySelector('div:first-child');
    
    if (buyButtonDiv && containerRef.current) {
      const clonedDiv = buyButtonDiv.cloneNode(true) as HTMLDivElement;
      containerRef.current.appendChild(clonedDiv);
    }

    // Extract and execute scripts
    const scripts = tempDiv.querySelectorAll("script");
    let scriptLoadPromise: Promise<void> | null = null;

    scripts.forEach((script) => {
      if (script.src) {
        // Check if external script already exists
        const existing = document.querySelector(`script[src="${script.src}"]`);
        if (existing) {
          // Script exists, initialize component
          if (window.ShopifyBuy && window.ShopifyBuy.UI) {
            const initPromise = (window.ShopifyBuy as any).UI.onReady((window.ShopifyBuy as any).buildClient({
              domain: '1br9kg-sj.myshopify.com',
              storefrontAccessToken: '4d3b0a50995876d6a3d50013281a3535',
            })).then(function (ui: any) {
              const node = document.getElementById(divId);
              // Check if component already exists (Shopify adds classes when initialized)
              if (node && !node.querySelector('.shopify-buy-btn') && !node.querySelector('[data-shopify-button-container]') && node.children.length === 0) {
                // Only create if not already created
                ui.createComponent('product', {
                  id: '10361722700085',
                  node: node,
                  moneyFormat: '%24%7B%7Bamount%7D%7D',
                  options: {
                    "product": {
                      "contents": {
                        "img": false,
                        "title": false,
                        "price": false
                      },
                      "text": {
                        "button": "Add to cart"
                      }
                    }
                  },
                });
              }
            }).catch((e: any) => {
              console.error("Error initializing Shopify Buy Button:", e);
            });
            scriptLoadPromise = initPromise;
          }
          return;
        }
        
        // Load the script
        const newScript = document.createElement("script");
        newScript.src = script.src;
        newScript.async = true;
        newScript.onload = () => {
          if (window.ShopifyBuy && window.ShopifyBuy.UI && divId) {
            setTimeout(() => {
              const node = document.getElementById(divId);
              if (node && !node.querySelector('.shopify-buy-btn')) {
                try {
                  const client = (window.ShopifyBuy as any).buildClient({
                    domain: '1br9kg-sj.myshopify.com',
                    storefrontAccessToken: '4d3b0a50995876d6a3d50013281a3535',
                  });
                  (window.ShopifyBuy as any).UI.onReady(client).then(function (ui: any) {
                    // Check if component already exists
                    if (!node.querySelector('.shopify-buy-btn') && !node.querySelector('[data-shopify-button-container]') && node.children.length === 0) {
                      ui.createComponent('product', {
                        id: '10361722700085',
                        node: node,
                        moneyFormat: '%24%7B%7Bamount%7D%7D',
                        options: {
                          "product": {
                            "contents": {
                              "img": false,
                              "title": false,
                              "price": false
                            },
                            "text": {
                              "button": "Add to cart"
                            }
                          }
                        },
                      });
                    }
                  });
                } catch (e) {
                  console.error("Error initializing Shopify Buy Button:", e);
                }
              }
            }, 100);
          }
        };
        document.body.appendChild(newScript);
      } else {
        // Inline script - execute it
        const newScript = document.createElement("script");
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      }
    });

    // Cleanup
    return () => {
      initializedRef.current = false;
      // Don't remove from loadedComponentIds on cleanup to prevent re-initialization
    };
  }, [buyButtonCode]);

  // Show placeholder if no code or placeholder detected
  if (!buyButtonCode || buyButtonCode.includes("Replace this with")) {
    return (
      <div className="mt-4 p-4 border border-dashed border-slate-300 rounded text-sm text-slate-500 text-center">
        Buy Button: Add your Shopify Buy Button embed code to show purchase options
      </div>
    );
  }

  return (
    <div className="mt-4 flex justify-center">
      <div
        ref={containerRef}
        className="shopify-buy-button-container"
        suppressHydrationWarning
      />
    </div>
  );
}

