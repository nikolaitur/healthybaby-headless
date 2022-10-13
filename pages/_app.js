import App from 'next/app'
import { nacelleClient } from 'services'
import { CartProvider, CheckoutProvider } from '@nacelle/react-hooks'
import createShopifyCheckoutClient from '@nacelle/shopify-checkout'
import { useEffect } from 'react'
import Layout from 'components/Layout'
import '../styles/globals.scss'
import TagManager from 'react-gtm-module'

// The `AppContainer` overrides Next's default `App` component.
// (https://nextjs.org/docs/advanced-features/custom-app)

// The `AppContainer` utilizes `CartProvider` and `CheckoutProvider` from
// `@nacelle/react-hooks` in order to manage cart and checkout data.
// (https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks)

// A Shopify Checkout client is created from `@nacelle/shopify-checkout`
// and passed to the `CheckoutProvider`.
// (https://github.com/getnacelle/nacelle-js/tree/main/packages/shopify-checkout)

function AppContainer({
  Component,
  pageProps,
  headerSettings,
  footerSettings,
}) {
  const checkoutClient = createShopifyCheckoutClient({
    myshopifyDomain: process.env.NEXT_PUBLIC_MYSHOPIFY_DOMAIN,
    storefrontCheckoutToken:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
    storefrontApiVersion: process.env.NEXT_PUBLIC_STOREFRONT_API_VERSION,
  })

  useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    })
  })

  return (
    <CartProvider>
      <CheckoutProvider checkoutClient={checkoutClient}>
        <Layout headerSettings={headerSettings} footerSettings={footerSettings}>
          <Component {...pageProps} />
        </Layout>
      </CheckoutProvider>
    </CartProvider>
  )
}

AppContainer.getInitialProps = async (appContext) => {
  const contentEntry = await nacelleClient.content({
    handles: ['header-settings', 'footer-settings'],
  })

  let headerSettings = contentEntry.filter(content => {
    return content.fields.handle == "header-settings";
  })[0];

  if (headerSettings.fields.mainNavigation?.length > 0) {
    headerSettings.fields.mainNavigation.map(async mainNavigation => {
      const productList = mainNavigation.fields.featuredProductsList.split(',')
      const products = await nacelleClient.products({
        handles: productList
      })
      const updatedMainNavigation = {
        ...mainNavigation
      }
      updatedMainNavigation.fields.featuredProductsList = products
      return updatedMainNavigation
    })
  }

  const footerSettings = contentEntry.filter(content => {
    return content.fields.handle == "footer-settings";
  })[0];

  const appProps = await App.getInitialProps(appContext)

  return { ...appProps, headerSettings, footerSettings }
}

export default AppContainer
