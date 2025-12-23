# Shopify Ecommerce Setup Guide

This guide explains how to set up Shopify integration for selling prints on your photography site.

## Prerequisites

1. A Shopify store account
2. Storefront API access token
3. Products and variants created in Shopify for your prints

## Environment Variables

Add these to your `.env.local` file (and to Vercel environment variables for production):

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
```

### Getting Your Storefront Access Token

1. Go to your Shopify admin panel
2. Navigate to **Settings** > **Apps and sales channels**
3. Click **Develop apps** (or **Manage private apps** in older Shopify versions)
4. Create a new app or use an existing one
5. Enable **Storefront API** access
6. Generate a Storefront API access token
7. Copy the token and add it to your environment variables

## Shopify Product Setup

For each print you want to sell:

1. **Create a Product** in Shopify
   - Set the product title (e.g., "Out of Water - Shady Lady")
   - Add product images
   - Set product type (e.g., "Photography Print")

2. **Create Variants** for each print size
   - Each variant represents a different size (e.g., "8x10", "11x14", "16x20")
   - Set the price for each variant
   - Note the Variant ID (you'll need this for the MDX frontmatter)

3. **Get Product and Variant IDs**
   - Product ID format: `gid://shopify/Product/123456789`
   - Variant ID format: `gid://shopify/ProductVariant/987654321`
   - You can find these in the Shopify admin URL or via the GraphQL API

## Project MDX Frontmatter

Add a `printProduct` field to your project's frontmatter:

```yaml
---
slug: out-of-water
title: Out of Water
oneLine: A series exploring boats taken out of water
dateStart: 2025-10-01T00:00:00.000Z
coverImageUrl: https://...
order: 1
printProduct:
  shopifyProductId: "gid://shopify/Product/123456789"
  imageUrl: "https://raw.githubusercontent.com/..."
  sizes:
    - name: "8x10"
      shopifyVariantId: "gid://shopify/ProductVariant/111111111"
      price: 25.00
      dimensions: "8\" x 10\""
    - name: "11x14"
      shopifyVariantId: "gid://shopify/ProductVariant/222222222"
      price: 35.00
      dimensions: "11\" x 14\""
    - name: "16x20"
      shopifyVariantId: "gid://shopify/ProductVariant/333333333"
      price: 55.00
      dimensions: "16\" x 20\""
---
```

## How It Works

1. **Buy Buttons**: When a project has a `printProduct` defined, "Buy Print" buttons automatically appear below each image in the project.

2. **Size Selection**: Clicking "Buy Print" opens a dialog where customers can select a print size and see pricing.

3. **Cart**: Items are added to a Shopify cart managed via the Storefront API. The cart persists in localStorage.

4. **Checkout**: Customers click "Checkout" to be redirected to Shopify's secure checkout page, where they complete payment and shipping.

5. **Fulfillment**: Orders are fulfilled by Graination (graination.ca) as configured in your Shopify store.

## Cart Features

- **Cart Icon**: Shows in the navigation bar with item count badge
- **Cart Page**: Accessible at `/cart` where customers can:
  - View all items
  - Update quantities
  - Remove items
  - Proceed to checkout

## Testing

1. **Development**: Use Shopify's test mode or a development store
2. **Test Cart Flow**:
   - Add items to cart
   - Verify cart persists on page refresh
   - Test checkout flow
   - Verify orders appear in Shopify admin

## Troubleshooting

### Cart not persisting
- Check that localStorage is enabled in browser
- Verify cart ID is being saved correctly

### "Failed to add to cart" errors
- Verify Shopify Storefront API token is correct
- Check that variant IDs match your Shopify products
- Ensure Storefront API has cart creation permissions

### Buy buttons not appearing
- Verify `printProduct` is defined in project frontmatter
- Check that schema validation passes
- Ensure ImageBlock component is rendering correctly

## Next Steps

1. Set up your Shopify store with products
2. Add environment variables
3. Update project MDX files with `printProduct` data
4. Test the full purchase flow
5. Configure shipping and tax settings in Shopify
6. Set up payment processing in Shopify

