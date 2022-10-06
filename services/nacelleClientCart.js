import createShopifyCartClient from '@nacelle/shopify-cart';

const cartClient = createShopifyCartClient({
  shopifyShopId: "healthybaby-dev.myshopify.com", // healthynesting.myshopify.com
  shopifyStorefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
});

export default cartClient