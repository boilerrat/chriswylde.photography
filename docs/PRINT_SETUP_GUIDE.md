# Print Sales Setup Guide

This guide explains how to set up print sales for individual photos in your projects.

## Current System

**One print product per project**: Currently, when you add a `printProduct` to a project's frontmatter, it applies to ALL images in that project. Each image will show a "Buy Print" button.

**Future enhancement**: We can add support for per-image print products if you need different products for different photos in the same project.

## Step-by-Step Setup

### 1. Create Products in Shopify

For each photo you want to sell:

1. **Go to Products** → **Add product**
2. **Product Title**: Use a descriptive name like:
   - "Out of Water - Shady Lady"
   - "Out of Water - Lighthouse Rowboat"
   - Or use the photo's alt text/caption
3. **Product Image**: Upload the photo you're selling
4. **Product Type**: Set to "Photography Print" (optional, for organization)
5. **Variants**: Create variants for each print size:
   - Click "Add variant"
   - Set variant title (e.g., "8x10", "11x14", "16x20")
   - Set price for each size
   - Set SKU (optional but recommended)
   - **For limited editions**: Set inventory quantity to 1
   - **For unlimited prints**: Leave inventory unlimited or set a high number
6. **Save** the product

### 2. Get Product and Variant IDs

You need the Shopify GraphQL IDs for your product and variants:

**Option A: From Shopify Admin URL**
- Product URL: `admin.shopify.com/store/your-store/products/123456789`
- The number at the end is the product ID
- Format as: `gid://shopify/Product/123456789`

**Option B: Using Shopify GraphQL (Recommended)**

1. Go to your Shopify admin
2. Navigate to **Settings** → **Apps and sales channels** → Your custom app
3. Use the GraphQL Admin API or Storefront API explorer
4. Run this query:

```graphql
{
  products(first: 10) {
    edges {
      node {
        id
        title
        variants(first: 10) {
          edges {
            node {
              id
              title
              price
            }
          }
        }
      }
    }
  }
}
```

This will return IDs in the format:
- Product: `gid://shopify/Product/123456789`
- Variant: `gid://shopify/ProductVariant/987654321`

**Option C: Browser Extension**
- Install a Shopify GraphQL ID finder browser extension
- It will show IDs when viewing products

### 3. Add printProduct to Your MDX File

Edit your project's MDX file (e.g., `content/projects/out-of-water.mdx`) and add the `printProduct` field to the frontmatter:

```yaml
---
slug: out-of-water
title: Out of Water
oneLine: A series exploring boats taken out of water
dateStart: 2025-10-01T00:00:00.000Z
dateEnd: 2025-10-02T00:00:00.000Z
location: Ontario, CDN
coverImageUrl: https://raw.githubusercontent.com/boilerrat/chriswylde-photography-assets/main/projects/out-of-water/2025-10-out-of-water-001-redreflections.jpg
order: 1
printProduct:
  shopifyProductId: "gid://shopify/Product/123456789"
  imageUrl: "https://raw.githubusercontent.com/boilerrat/chriswylde-photography-assets/main/projects/out-of-water/2025-10-out-of-water-001-redreflections.jpg"
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

### 4. Field Descriptions

- **shopifyProductId**: The Shopify GraphQL Product ID
- **imageUrl**: URL to the photo being sold (can be same as coverImageUrl or any image in the project)
- **sizes**: Array of print sizes available
  - **name**: Display name (e.g., "8x10", "11x14")
  - **shopifyVariantId**: The Shopify GraphQL Variant ID for this size
  - **price**: Price in CAD (displayed as C$)
  - **dimensions**: Optional display text (e.g., "8\" x 10\"")

## How It Works

1. **Buy Buttons Appear**: Once `printProduct` is added, all images in the project will show a "Buy Print" button below them
2. **Size Selection**: Clicking "Buy Print" opens a dialog where customers select a size
3. **Add to Cart**: Selected items are added to the Shopify cart
4. **Checkout**: Customers go to `/cart` to review and checkout via Shopify

## Limited Edition vs Unlimited Prints

### Limited Edition (One-off)
- In Shopify: Set inventory quantity to **1** for the variant
- When someone buys it, inventory becomes 0
- Shopify will prevent additional purchases
- You can manually restock if needed

### Unlimited Prints
- In Shopify: Leave inventory **unlimited** or set a very high number
- Multiple customers can purchase the same print
- No inventory restrictions

## Example: Complete Project with Prints

```yaml
---
slug: out-of-water
title: Out of Water
oneLine: A series exploring boats taken out of water
dateStart: 2025-10-01T00:00:00.000Z
coverImageUrl: https://raw.githubusercontent.com/...
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

<TextBlock style="paragraph">
This project explores the boats out of water.
</TextBlock>

<ImageBlock
  url="https://raw.githubusercontent.com/..."
  alt="Shady Lady"
  caption="Shady Lady"
  layout="full"
/>
<!-- This image will show a "Buy Print" button because printProduct is defined -->
```

## Troubleshooting

### Buy buttons not appearing
- ✅ Check that `printProduct` is in the frontmatter
- ✅ Verify the YAML syntax is correct (proper indentation)
- ✅ Restart your dev server after editing MDX files
- ✅ Check browser console for errors

### "Failed to add to cart" errors
- ✅ Verify Shopify variant IDs are correct
- ✅ Check that variants exist in Shopify
- ✅ Ensure Storefront API has proper permissions
- ✅ Verify environment variables are set correctly

### Prices not matching
- ✅ Update prices in both Shopify AND the MDX file
- ✅ Prices in MDX are for display only - Shopify prices are what customers actually pay
- ✅ Keep them in sync for consistency

## Next Steps

1. Create your first product in Shopify
2. Get the Product and Variant IDs
3. Add `printProduct` to one of your project MDX files
4. Test the buy flow
5. Repeat for other photos you want to sell

## Future Enhancements

If you need **different print products for different images** in the same project, we can enhance the system to support per-image `printProductId` attributes. Let me know if you'd like this feature!

