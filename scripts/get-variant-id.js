// Quick script to get variant ID from Shopify product
// Run this in browser console on your product page

const productId = "10361722700085";

// Method 1: Try to find variant ID in page data
function findVariantId() {
  console.log("Searching for variant ID...");
  
  // Check all script tags
  const scripts = Array.from(document.querySelectorAll('script'));
  scripts.forEach((script, index) => {
    const text = script.textContent || script.innerHTML || '';
    if (text.includes('ProductVariant') || text.includes(productId)) {
      // Look for GraphQL ID format
      const variantMatches = text.match(/gid:\/\/shopify\/ProductVariant\/(\d+)/g);
      if (variantMatches) {
        console.log(`Found in script ${index}:`, variantMatches);
        variantMatches.forEach(id => console.log('Variant ID:', id));
      }
      
      // Look for numeric variant IDs
      const numericMatches = text.match(/variants.*?id["\s:]+(\d{10,})/gi);
      if (numericMatches) {
        console.log('Possible variant IDs:', numericMatches);
      }
    }
  });
  
  // Check window objects
  if (window.__INITIAL_STATE__) {
    console.log('__INITIAL_STATE__:', window.__INITIAL_STATE__);
  }
  
  if (window.Shopify?.analytics?.meta?.product) {
    const product = window.Shopify.analytics.meta.product;
    console.log('Product from Shopify analytics:', product);
    if (product.variants) {
      product.variants.forEach(v => {
        console.log('Variant:', v.title, 'ID:', v.id);
        console.log('GraphQL ID: gid://shopify/ProductVariant/' + v.id);
      });
    }
  }
  
  // Check data attributes
  const variantElements = document.querySelectorAll('[data-variant-id], [data-product-variant-id]');
  variantElements.forEach(el => {
    const id = el.getAttribute('data-variant-id') || el.getAttribute('data-product-variant-id');
    if (id) {
      console.log('Variant ID from element:', id);
      console.log('GraphQL format: gid://shopify/ProductVariant/' + id);
    }
  });
}

findVariantId();

// Method 2: Try to fetch from Storefront API (if you have the token)
console.log("\n=== Alternative: Use GraphQL Query ===");
console.log("Go to your custom app's API credentials and use this query:");
console.log(`
{
  product(id: "gid://shopify/Product/10361722700085") {
    id
    title
    variants(first: 1) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
`);

