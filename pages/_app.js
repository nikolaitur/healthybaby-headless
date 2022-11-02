import App from 'next/app'
import { nacelleClient } from 'services'
import { CartProvider, CheckoutProvider } from '@nacelle/react-hooks'
import createShopifyCheckoutClient from '@nacelle/shopify-checkout'
import { useEffect } from 'react'
import Layout from 'components/Layout'
import '../styles/globals.scss'
import TagManager from 'react-gtm-module'
import { dataLayerRouteChange } from '@/utils/dataLayer'
import { useRouter } from 'next/router'
import Head from 'next/head'
import queryString from 'query-string'

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
  const router = useRouter()
  const checkoutClient = createShopifyCheckoutClient({
    myshopifyDomain: process.env.NEXT_PUBLIC_MYSHOPIFY_DOMAIN,
    storefrontCheckoutToken:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
    storefrontApiVersion: process.env.NEXT_PUBLIC_STOREFRONT_API_VERSION,
  })

  const trackUtmParams = () => {
    const utmVars = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'gclid'
    ]

    const clidVars = ['fbclid', 'ttclid', 'irclickid']

    const qs = queryString.parse(location.search)

    const foundClidVars = clidVars.map((key) => qs[key]).filter((item) => item)
    const foundUtmVars = utmVars.map((key) => qs[key]).filter((item) => item)

    // return if no changes found in url params
    if (!foundClidVars.length && !foundUtmVars.length) {
      return
    }

    // save click ids to localstorage
    if (foundClidVars.length) {
      clidVars.forEach((key) => {
        if (qs[key]) {
          localStorage.setItem(key, qs[key])
        }
      })
    }

    // save utm vars to localstorage
    if (foundUtmVars.length) {
      utmVars.forEach((key) => {
        if (qs[key]) {
          localStorage.setItem(key, qs[key])
        } else {
          localStorage.removeItem(key)
        }
      })
    }
  }

  const onRountChangeComplete = (newUrl) => {
    trackUtmParams()
    if (TagManager) {
      dataLayerRouteChange({ url: newUrl })
    }
  }

  useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    })
    onRountChangeComplete(router.asPath)
    router.events.on('routeChangeComplete', onRountChangeComplete)
    return () => {
      router.events.off('routeChangeComplete', onRountChangeComplete)
    }
  }, [])

  return (
    <CartProvider>
      <CheckoutProvider checkoutClient={checkoutClient}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
          />
        </Head>
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

  let headerSettings = contentEntry.filter((content) => {
    return content.fields.handle == 'header-settings'
  })[0]

  // client request to remove the featured products section in megamenu
  // if (headerSettings.fields.mainNavigation?.length > 0) {
  //   headerSettings.fields.mainNavigation.map(async mainNavigation => {
  //     if (mainNavigation.fields?.featuredProductsList) {
  //       const productList = mainNavigation.fields.featuredProductsList.split(',')
  //       const products = await nacelleClient.products({
  //         handles: productList
  //       })
  //       const updatedMainNavigation = {
  //         ...mainNavigation
  //       }
  //       updatedMainNavigation.fields.featuredProductsList = products
  //       return updatedMainNavigation
  //     }
  //     return mainNavigation
  //   })
  // }

  const footerSettings = contentEntry.filter((content) => {
    return content.fields.handle == 'footer-settings'
  })[0]

  const appProps = await App.getInitialProps(appContext)

  return { ...appProps, headerSettings, footerSettings }
}

export default AppContainer
