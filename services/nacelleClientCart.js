import createShopifyCartClient from '@nacelle/shopify-cart'

const cartClient = createShopifyCartClient({
  shopifyShopId: process.env.NEXT_PUBLIC_MYSHOPIFY_DOMAIN, // healthynesting.myshopify.com
  shopifyStorefrontAccessToken:
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
  shopifyCustomEndpoint: `https://${
    process.env.NEXT_PUBLIC_CHECKOUT_DOMAIN ||
    process.env.NEXT_PUBLIC_MYSHOPIFY_DOMAIN
  }/api/2022-07/graphql`,
})

export default cartClient
