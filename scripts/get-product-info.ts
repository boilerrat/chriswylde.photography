// Script to fetch product info from Shopify
// Usage: npx tsx scripts/get-product-info.ts <product-id>

import { shopifyClient } from "../lib/shopify";

const GET_PRODUCT_QUERY = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
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
`;

async function getProductInfo(productId: string) {
  try {
    const graphqlId = productId.startsWith("gid://") 
      ? productId 
      : `gid://shopify/Product/${productId}`;
    
    console.log(`Fetching product: ${graphqlId}`);
    
    const response = await shopifyClient.request(GET_PRODUCT_QUERY, {
      variables: { id: graphqlId },
    });

    const product = response.data?.product;
    
    if (!product) {
      console.error("Product not found");
      return;
    }

    console.log("\n=== Product Info ===");
    console.log(`Title: ${product.title}`);
    console.log(`Product ID: ${product.id}`);
    console.log(`\nVariants:`);
    
    product.variants.edges.forEach((edge: any, index: number) => {
      const variant = edge.node;
      const price = parseFloat(variant.price.amount);
      console.log(`\n${index + 1}. ${variant.title}`);
      console.log(`   Variant ID: ${variant.id}`);
      console.log(`   Price: ${variant.price.currencyCode} $${price.toFixed(2)}`);
    });

    console.log("\n=== MDX Configuration ===");
    console.log("Add this to your project frontmatter:\n");
    console.log("printProduct:");
    console.log(`  shopifyProductId: "${product.id}"`);
    console.log(`  imageUrl: "${product.images.edges[0]?.node.url || 'YOUR_IMAGE_URL'}"`);
    console.log("  sizes:");
    
    product.variants.edges.forEach((edge: any) => {
      const variant = edge.node;
      const price = parseFloat(variant.price.amount);
      // Extract size from variant title (e.g., "8x10" from "8x10" or "8 x 10")
      const sizeMatch = variant.title.match(/(\d+)\s*[x×]\s*(\d+)/i);
      const sizeName = sizeMatch ? `${sizeMatch[1]}x${sizeMatch[2]}` : variant.title;
      const dimensions = sizeMatch ? `"${sizeMatch[1]}\" x ${sizeMatch[2]}\""` : undefined;
      
      console.log(`    - name: "${sizeName}"`);
      console.log(`      shopifyVariantId: "${variant.id}"`);
      console.log(`      price: ${price.toFixed(2)}`);
      if (dimensions) {
        console.log(`      dimensions: ${dimensions}`);
      }
    });

  } catch (error) {
    console.error("Error fetching product:", error);
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

// Run if called directly
const productId = process.argv[2];
if (productId) {
  getProductInfo(productId);
} else {
  console.log("Usage: npx tsx scripts/get-product-info.ts <product-id>");
  console.log("Example: npx tsx scripts/get-product-info.ts 10361722700085");
}

