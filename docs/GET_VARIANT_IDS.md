# How to Get Shopify Variant IDs

To complete the setup for "Red Reflections", you need to get the Variant IDs from Shopify.

## Quick Method: Using Shopify Admin

1. **Go to your product page**: https://admin.shopify.com/store/chris-wylde-photography/products/10361722700085

2. **View the product variants**:
   - Scroll down to the "Variants" section
   - You'll see each size variant listed

3. **Get Variant IDs** - You have a few options:

### Option A: Browser Console (Easiest)
1. Open the product page in Shopify admin
2. Press `F12` (or right-click → Inspect) to open Developer Tools
3. Go to the **Console** tab
4. Paste this code and press Enter:

```javascript
// Get variant IDs from the page
const variants = document.querySelectorAll('[data-variant-id]');
variants.forEach(v => {
  const id = v.getAttribute('data-variant-id');
  if (id) console.log('Variant ID:', id);
});

// Or try this if the above doesn't work:
const scriptTags = Array.from(document.querySelectorAll('script'));
scriptTags.forEach(script => {
  const content = script.textContent || '';
  if (content.includes('ProductVariant')) {
    const matches = content.match(/gid:\/\/shopify\/ProductVariant\/(\d+)/g);
    if (matches) {
      matches.forEach(m => console.log('Found:', m));
    }
  }
});
```

### Option B: Using GraphQL Admin API
1. Go to **Settings** → **Apps and sales channels** → Your custom app
2. Click on your app → **API credentials**
3. Use the GraphQL Admin API endpoint
4. Run this query:

```graphql
{
  product(id: "gid://shopify/Product/10361722700085") {
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
```

### Option C: Check the Network Tab
1. Open Developer Tools (`F12`)
2. Go to **Network** tab
3. Refresh the product page
4. Look for API requests containing "variants"
5. Check the response JSON for variant IDs

## Once You Have the Variant IDs

Update your `content/projects/out-of-water.mdx` file:

Replace `REPLACE_WITH_VARIANT_ID` with the actual variant IDs, for example:

```yaml
sizes:
  - name: "8x10"
    shopifyVariantId: "gid://shopify/ProductVariant/12345678901"
    price: 25.00
    dimensions: "8\" x 10\""
  - name: "11x14"
    shopifyVariantId: "gid://shopify/ProductVariant/12345678902"
    price: 35.00
    dimensions: "11\" x 14\""
  - name: "16x20"
    shopifyVariantId: "gid://shopify/ProductVariant/12345678903"
    price: 55.00
    dimensions: "16\" x 20\""
```

**Important**: Also update the `price` field with the actual prices from Shopify (in CAD).

## After Updating

1. Save the MDX file
2. Restart your dev server (`npm run dev`)
3. Visit your project page
4. You should see "Buy Print" buttons below each image!

