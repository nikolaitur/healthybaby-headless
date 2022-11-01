import TagManager from 'react-gtm-module'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { formatPrice } from './formatPrice'
import * as Cookies from 'es-cookie'

function getUserProperties(customer)  {
  let customerProps = {
    user_consent: '',
    visitor_type: 'guest',
    user_id: Cookies.get('elevar_user_id') || (() => {
      const elevarUserId = uuidv4()
      Cookies.set('elevar_user_id', elevarUserId, {path: '/'})
      return elevarUserId
    })()
    // user_id : "XXXXX" // This is a unique user id. It should be persisted as long as possible ideally between user sessions
  }
  if (customer) {
    customerProps = {
      ...customerProps,
      customer_email: customer.email,
      customer_id: customer.id.replace('gid://shopify/Customer/', ''),
      customer_first_name: customer.firstName,
      customer_last_name: customer.lastName,
      customer_tags: customer.tags || [],
      visitor_type: 'logged_in'
    }
  }

  if (customer?.orders?.edges?.length) {
    let orderTotal = 0
    for (var i = 0; i < customer.orders?.edges?.length; i++) {
      orderTotal += parseFloat(customer.orders.edges[i].node.totalPriceV2.amount)
    }
    customerProps = {
      ...customerProps,
      customer_order_count: customer.orders.length.toString(),
      customer_total_spent: orderTotal.toString(),
    }
  }

  if (customer?.defaultAddress) {
    customerProps = {
      ...customerProps,
      customer_address_1: customer.defaultAddress.address1,
      customer_address_2: customer.defaultAddress.address2,
      customer_city: customer.defaultAddress.city,
      customer_country: customer.defaultAddress.country,
      customer_phone: customer.phone || '',
      customer_province: customer.defaultAddress.province,
      customer_province_code: customer.defaultAddress.provinceCode,
      customer_zip: customer.defaultAddress.zip
    }
  }
  console.log("dl user properties:", customerProps)
  return customerProps
}

function getMarketingData() {
  const marketingProps = {
    // This is the GA4 cookie ID. The XXX... portion of the cookie will differ for every client
    _ga_T2Z4QVLW4Q: Cookies.get('_ga_T2Z4QVLW4Q') || '', // GA4 Cookie ID
    _fbp: Cookies.get('_fbp') || '', // FB cookie id
    _fbc:  Cookies.get('_fbp') || '',// FB cookie id if available
    _ga: Cookies.get('_ga') || '', // GA cookie id
    _gaexp: Cookies.get('_gaexp') || '',// Optimize cookie id if available
    _gid:  Cookies.get('_gid') || '',// GA cookie id if available
    __utma:  Cookies.get('__utma') || '',// GA cookie id if available
    ttclid: Cookies.get('ttclid') || '',// TikTok cookie ID if using TikTok
    crto_mapped_user_id: Cookies.get('crto_mapped_user_id') || '', // Criteo cookie id if using Criteo
    crto_is_user_optout: 'false', // Criteo opt out status
    user_id: 'bc574dca-c842-4de7-98a1-dd9529729456', // UUID uniqe per user, should be persisted as long as possible and kept consistent between sessions
  }
  console.log("dl marketing properties:", marketingProps)
  return marketingProps
}

function buildProductData(products, type, url) {
  let category = ''
  if (type === 'collection' && url !== '/shop-all') {
    category = url.replace('/collections/', '')
  }
  return products.map((product, index) => {
    const firstVariant = product.variants[0]
    const data = {
      id: firstVariant.sku, // SKU
      name: product.content.title, // Product title
      brand: 'Healthy Baby',
      category: category,
      variant: firstVariant.content.title,
      price: firstVariant.price.toString(),
      quantity: '1',
      product_id: product.sourceEntryId.replace('gid://shopify/Product/', ''), // The product_id
      variant_id: firstVariant.sourceEntryId.replace(
        'gid://shopify/ProductVariant/',
        ''
      ), // id or variant_id
      inventory: firstVariant.quantityAvailable?.toString(),
      compare_at_price: firstVariant?.compareAtPrice?.toString() || '', // If available on dl_view_item & dl_add_to_cart otherwise use an empty string
      image: firstVariant.content.featuredMedia?.src || '', // If available, otherwise use an empty string
    }

    if (type === 'collection') {
      data['list'] = url // The list the product was discovered from or is displayed in
      data['position'] = (index + 1).toString() // position in the list of search results, collection views and position in cart indexed starting at 1
    }

    return data
  })
}

function buildProductDataWithVariantOption(product, variantOption) {
  const filterdVariants = product.variants.filter((item) => {
    return item.content.title.includes(variantOption)
  })
  const variant = filterdVariants[0]
  return {
    id: variant.sku, // SKU
    name: product.content.title, // Product title
    brand: 'Healthy Baby',
    category: '',
    variant: variant.content.title,
    price: variant.price.toString(),
    quantity: '1',
    product_id: product.sourceEntryId.replace('gid://shopify/Product/', ''), // The product_id
    variant_id: variant.sourceEntryId.replace(
      'gid://shopify/ProductVariant/',
      ''
    ), // id or variant_id
    inventory: variant.quantityAvailable?.toString(),
    compare_at_price: variant?.compareAtPrice?.toString() || '', // If available on dl_view_item & dl_add_to_cart otherwise use an empty string
    image: variant.content.featuredMedia?.src || '', // If available, otherwise use an empty string
  }
}

// TODO: make this also fire on every page load
export const dataLayerUserData = ({ cart, customer, url }) => {
  const device = {
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    encoding: document.characterSet,
    language: window.navigator.language,
    colors: `${window.screen.colorDepth}-bit`,
  }
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)

  const cartSubtotal = cart.reduce((sum, lineItem) => {
    if (lineItem.sellingPlan) {
      const sellingPlanPriceValue = JSON.parse(lineItem.sellingPlan.value)
      const sellingPlanPrice =
        sellingPlanPriceValue[0].sellingPlan.priceAdjustments
      return (
        sum +
        sellingPlanPriceValue[0].priceAdjustments[0].price.amount *
          lineItem.quantity
      )
    } else {
      return sum + lineItem.variant.price * lineItem.quantity
    }
  }, 0)
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_user_data',
      device,
      event_id: uniqueKey.toString(),
      user_properties,
      marketing: getMarketingData(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      cart_total: cartSubtotal.toString(),
      page: {
        url: url,
      },
      ecommerce: {
        currencyCode: 'USD',
        cart_contents: {
          products: buildProductData(
            cart.map((item) => item.product),
            'collection',
            url
          ),
        },
      },
    },
  })
}

export const dataLayerATC = ({ customer, item, url }) => {
  const category = url.includes('/collections/')
    ? url.replace('/collections/', '')
    : ''
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_add_to_cart',
      event_id: uniqueKey.toString(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        currencyCode: 'USD',
        add: {
          actionField: { list: url },
          products: [
            {
              id: item.variant.sku, // SKU
              name: item.variant.productTitle, // Product title
              brand: 'Healthy Baby',
              category: category,
              variant: item.variant.title,
              price: item.variant.price.toString(),
              quantity: '1',
              product_id: item.product.sourceEntryId.replace(
                'gid://shopify/Product/',
                ''
              ), // The product_id
              variant_id: item.variantId.toString(), // id or variant_id
              compare_at_price: item.variant?.compareAtPrice?.toString() || '', // If available on dl_view_item & dl_add_to_cart otherwise use an empty string
              image: item.variant.featuredMedia?.src || '', // If available, otherwise use an empty string
            },
          ],
        },
      },
      user_properties,
      marketing: getMarketingData(),
    },
  })
}

/*
  - this is for removing from cart
*/
export const dataLayerRFC = ({ customer, item }) => {
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_remove_from_cart',
      event_id: uniqueKey.toString(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        remove: {
          products: [
            {
              id: item.variant.sku, // SKU
              name: item.variant.productTitle, // Product title
              brand: 'Healthy Baby',
              category: '',
              variant: item.variant.title,
              price: item.variant.price.toString(),
              quantity: '0',
              product_id: item.product.sourceEntryId.replace(
                'gid://shopify/Product/',
                ''
              ),
              variant_id: item.variant.id
                .split('gid://shopify/ProductVariant/')
                .pop(), // id or variant_id
              compare_at_price: item.variant?.compareAtPrice?.toString() || '', // If available on dl_view_item & dl_add_to_cart otherwise use an empty string
              image: item.variant.featuredMedia?.src || '', // If available, otherwise use an empty string
            },
          ],
        },
      },
      user_properties,
      marketing: getMarketingData(),
    },
  })
}

export const dataLayerViewProductList = ({ customer, products, url }) => {
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)
  TagManager.dataLayer({
    dataLayer: {
      event_id: uniqueKey.toString(),
      event: 'dl_view_item_list',
      user_properties,
      marketing: getMarketingData(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        currencyCode: 'USD',
        impressions: buildProductData([...products], 'collection', url),
      },
    },
  })
}

export const dataLayerViewSearchResults = ({ customer, products }) => {
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_view_search_results',
      user_properties,
      marketing: getMarketingData(),
      event_id: uniqueKey.toString(), // unique uuid for FB conversion API
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        currencyCode: 'USD',
        actionField: { list: 'search results' },
        impressions: products.map((item, index) => {
          return {
            name: item.content.title, // Product title
            brand: 'Healthy Baby',
            category: '',
            product_id: item.sourceEntryId
              .split('gid://shopify/Product/')
              .pop(), // The product_id
            id: item.variants[0].sku,
            price: item.variants[0].price.toString(),
            variant_id: item.variants[0].sourceEntryId
              .split('gid://shopify/ProductVariant/')
              .pop(), // id or variant_id
            image: item.content?.featuredMedia?.src || '', // If available, otherwise use an empty string
            list: '/search',
            position: (index + 1).toString(),
          }
        }),
      },
    },
  })
}

/*
  Use this for selecting products from collections/search results
*/
export const dataLayerSelectProduct = ({ customer, product, url }) => {
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_select_item',
      user_properties,
      marketing: getMarketingData(),
      event_id: uniqueKey.toString(), // unique uuid for FB conversion API
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        currencyCode: 'USD',
        click: {
          actionField: { list: url, action: 'click' }, // this should be the collection page URL
          products: buildProductData([product], 'collection', url),
        },
      },
    },
  })
}

export const dataLayerViewCart = ({ customer, cart, url }) => {
  const cartSubtotal = cart.reduce((sum, lineItem) => {
    if (lineItem.sellingPlan) {
      const sellingPlanPriceValue = JSON.parse(lineItem.sellingPlan.value)
      const sellingPlanPrice =
        sellingPlanPriceValue[0].sellingPlan.priceAdjustments
      return (
        sum +
        sellingPlanPriceValue[0].priceAdjustments[0].price.amount *
          lineItem.quantity
      )
    } else {
      return sum + lineItem.variant.price * lineItem.quantity
    }
  }, 0)
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)
  if (!cart.length) {
    return false
  }
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_view_cart',
      event_id: uniqueKey.toString(),
      user_properties,
      marketing: getMarketingData(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      cart_total: cartSubtotal.toString(),
      ecommerce: {
        currencyCode: 'USD',
        actionField: { list: 'Shopping Cart' },
        impressions: buildProductData(
          cart.map((item) => item.variant.product),
          'collection',
          url
        ),
      },
    },
  })
}

export const dataLayerBeginCheckout = ({ customer, cart }) => {
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_begin_checkout',
      event_id: uniqueKey.toString(),
      user_properties,
      marketing: getMarketingData(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        checkout: {
          actionField: { step: '1', action: 'checkout' },
        },
        products: buildProductData(cart.map((item) => item.product)),
      },
    },
  })
}

export const dataLayerSignup = ({ customer, url }) => {
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_sign_up',
      event_id: uniqueKey.toString(),
      user_properties,
      marketing: getMarketingData(),
      page: {
        url: url,
      },
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
    },
  })
}

export const dataLayerLogin = ({ customer, url }) => {
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)
  TagManager.dataLayer({
    dataLayer: {
      event_id: uniqueKey.toString(),
      event: 'dl_login',
      page: {
        url: url,
      },
      user_properties,
      marketing: getMarketingData(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
    },
  })
}

export const dataLayerViewProduct = ({ customer, product, url, variantOption }) => {
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_view_item',
      user_properties,
      marketing: getMarketingData(),
      event_id: uniqueKey.toString(), // unique uuid for FB conversion API
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        currencyCode: 'USD',
        detail: {
          actionField: { list: url, action: 'detail' },
          products: variantOption
            ? buildProductDataWithVariantOption(product, variantOption)
            : buildProductData([product], 'product', url),
        },
      },
    },
  })
}

export const dataLayerRouteChange = ({ url }) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_route_change',
      url: url,
    },
  })
}
