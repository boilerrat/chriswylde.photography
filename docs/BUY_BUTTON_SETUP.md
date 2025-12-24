# Shopify Buy Button Setup Guide

This guide explains how to use Shopify's Buy Button embed code to sell prints on your photography site.

## Why Buy Button?

- ✅ **No API keys needed** - Shopify generates everything for you
- ✅ **Simple setup** - Just copy and paste code
- ✅ **Shopify handles checkout** - Secure, hosted checkout
- ✅ **Cart included** - Shopify manages the cart automatically
- ✅ **No custom code** - Works out of the box

## Setup Steps

### 1. Add Buy Button Sales Channel

1. Go to your Shopify admin
2. Click **Sales channels** → **Add channel**
3. Select **Buy Button**
4. Click **Add Buy Button**

### 2. Create a Buy Button for Your Product

1. In Shopify admin, go to **Sales channels** → **Buy Button**
2. Click **Create Buy Button**
3. Select **Product Buy Button**
4. Choose your product (e.g., "Red Reflections")
5. Customize the layout:
   - **Button style**: Choose a style that matches your site
   - **Button text**: "Buy Print" or "Purchase"
   - **Layout**: "Button" (simplest) or "Product card" (if you want product details)
6. Click **Copy code**

### 3. Add to Your Project MDX File

Edit your project's MDX file (e.g., `content/projects/out-of-water.mdx`) and add the Buy Button code:

```yaml
---
slug: out-of-water
title: Out of Water
# ... other fields ...
printProduct:
  buyButtonCode: |
    <div id="shopify-buy-button-123456789"></div>
    <script type="text/javascript">
      (function() {
        var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        if (window.ShopifyBuy) {
          if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
          } else {
            loadScript();
          }
        } else {
          loadScript();
        }
        function loadScript() {
          var script = document.createElement('script');
          script.async = true;
          script.src = scriptURL;
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
          script.onload = ShopifyBuyInit;
        }
        function ShopifyBuyInit() {
          var client = ShopifyBuy.buildClient({
            domain: 'chris-wylde-photography.myshopify.com',
            storefrontAccessToken: 'your-token-here',
          });
          ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
              id: '10361722700085',
              node: document.getElementById('shopify-buy-button-123456789'),
              moneyFormat: '%24%7B%7Bamount%7D%7D',
              options: {
                "product": {
                  "styles": {
                    "product": {
                      "@media (min-width: 601px)": {
                        "max-width": "100%",
                        "margin-left": "0",
                        "margin-bottom": "50px"
                      }
                    }
                  },
                  "text": {
                    "button": "Buy Print"
                  }
                },
                "productSet": {
                  "styles": {
                    "products": {
                      "@media (min-width: 601px)": {
                        "margin-left": "-20px"
                      }
                    }
                  }
                },
                "modalProduct": {
                  "contents": {
                    "img": false,
                    "imgWithCarousel": true,
                    "button": false,
                    "buttonWithQuantity": true
                  },
                  "styles": {
                    "product": {
                      "@media (min-width: 601px)": {
                        "max-width": "100%",
                        "margin-left": "0px",
                        "margin-bottom": "0px"
                      }
                    }
                  },
                  "text": {
                    "button": "Add to cart"
                  }
                },
                "cart": {
                  "text": {
                    "total": "Subtotal",
                    "button": "Checkout"
                  }
                },
                "toggle": {
                  "styles": {
                    "toggle": {
                      "background-color": "#000000",
                      ":hover": {
                        "background-color": "#000000"
                      },
                      ":focus": {
                        "background-color": "#000000"
                      }
                    }
                  }
                }
              }
            });
          });
        }
      })();
    </script>
---
```

**Important**: 
- Paste the **entire code** Shopify gives you between the `|` and `|` (the pipe characters)
- Keep the indentation consistent
- The code should include both the `<div>` and `<script>` tags

### 4. Per-Image Buy Buttons (Optional)

If you want different buy buttons for different images in the same project, you can add a `buyButtonCode` attribute directly to ImageBlock:

```mdx
<ImageBlock
  url="https://..."
  alt="Shady Lady"
  caption="Shady Lady"
  layout="full"
  buyButtonCode="<div id='shopify-buy-button-123'>...</div><script>...</script>"
/>
```

(Note: This requires updating the ImageBlock component to accept this prop)

## How It Works

1. **Buy Button Appears**: When `printProduct.buyButtonCode` is defined, the Buy Button appears below each image
2. **Click Buy**: Customer clicks the button
3. **Shopify Cart**: Shopify's cart UI appears (managed by Shopify)
4. **Checkout**: Customer checks out on Shopify's secure checkout page
5. **Order Fulfillment**: Orders appear in your Shopify admin

## Customization

You can customize the Buy Button appearance in Shopify:
- Button style and colors
- Button text
- Layout (button vs product card)
- Cart behavior

All customization is done in Shopify's Buy Button settings before copying the code.

## Troubleshooting

### Buy button not appearing
- ✅ Check that `buyButtonCode` is properly formatted in YAML
- ✅ Ensure the code includes both `<div>` and `<script>` tags
- ✅ Check browser console for JavaScript errors
- ✅ Verify the code was copied completely from Shopify

### Button styling doesn't match site
- ✅ Customize the button in Shopify's Buy Button settings
- ✅ Or add custom CSS targeting `.shopify-buy-button-container`

### Multiple buttons on same page
- ✅ Each Buy Button needs a unique `id` in the div
- ✅ Shopify generates unique IDs automatically
- ✅ If copying code, make sure each has a different ID

## Benefits Over Storefront API

- ✅ **Simpler**: No API keys, no environment variables
- ✅ **Less code**: No custom cart implementation
- ✅ **Shopify managed**: Cart, checkout, and order management handled by Shopify
- ✅ **Easier updates**: Update products in Shopify, buttons update automatically
- ✅ **Better security**: Shopify handles all payment processing

## Next Steps

1. Create Buy Buttons in Shopify for each product
2. Copy the code into your project MDX files
3. Test the buy flow
4. Customize button appearance as needed

That's it! Much simpler than the Storefront API approach.

