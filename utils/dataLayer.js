import TagManager from 'react-gtm-module'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { formatPrice } from './formatPrice'

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
  let user_properties = {
    visitor_type: 'guest',
    user_consent: '',
    user_id: uniqueKey.toString(),
    // TODO: The user_id should be a uuid stored in session and should be persisted as long as possible ideally between user sessions
  }

  if (customer) {
    let orderTotal = 0
    for (var i = 0; i < customer.orders?.edges?.length; i++) {
      orderTotal += parseFloat(
        customer.orders.edges[i].node.totalPriceV2.amount
      )
    }

    user_properties = {
      customer_id: customer.id,
      customer_email: customer.email,
      customer_order_count: customer.orders.length.toString(),
      customer_total_spent: orderTotal.toString(),
      visitor_type: 'logged_in',
      user_consent: '',
      user_id: customer.id,
      // TODO: The user_id should be a uuid stored in session and should be persisted as long as possible ideally between user sessions
    }
  }
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
      user_properties: user_properties,
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
      // TODO: Add marketing object
    },
  })
}

export const dataLayerATC = ({ item, url }) => {
  const category = url.includes('/collections/')
    ? url.replace('/collections/', '')
    : ''
  const uniqueKey = uuidv4()
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
      // TODO: add user_properties object
      // TODO: add marketing object
    },
  })
}

/*
  - this is for removing from cart
*/
export const dataLayerRFC = ({ item }) => {
  const uniqueKey = uuidv4()
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
      // TODO: add user_properties object
      // TODO: add marketing object
    },
  })
}

export const dataLayerViewProductList = ({ products, url }) => {
  const uniqueKey = uuidv4()
  TagManager.dataLayer({
    dataLayer: {
      event_id: uniqueKey.toString(),
      event: 'dl_view_item_list',
      // user_properties: user_properties,
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        currencyCode: 'USD',
        impressions: buildProductData([...products], 'collection', url),
      },
      // TODO: add user_properties object
      // TODO: add marketing object
    },
  })
}

export const dataLayerViewSearchResults = ({ products }) => {
  const uniqueKey = uuidv4()
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_view_search_results',
      // user_properties: user_properties,
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
      // TODO: add user_properties object
      // TODO: add marketing object
    },
  })
}

/*
  Use this for selecting products from collections/search results
*/
export const dataLayerSelectProduct = ({ product, url }) => {
  const uniqueKey = uuidv4()
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_select_item',
      // user_properties: user_properties,
      event_id: uniqueKey.toString(), // unique uuid for FB conversion API
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        currencyCode: 'USD',
        click: {
          actionField: { list: url, action: 'click' }, // this should be the collection page URL
          products: buildProductData([product], 'collection', url),
        },
      },
      // TODO: add user_properties object
      // TODO: add marketing object
    },
  })
}

export const dataLayerViewCart = ({ cart, url }) => {
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
  if (!cart.length) {
    return false
  }
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_view_cart',
      event_id: uniqueKey.toString(),
      // user_properties: user_properties,
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
      // TODO: add user_properties object
      // TODO: add marketing object
    },
  })
}

export const dataLayerBeginCheckout = ({ cart }) => {
  const uniqueKey = uuidv4()
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_begin_checkout',
      event_id: uniqueKey.toString(),
      // user_properties: user_properties,
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        checkout: {
          actionField: { step: '1', action: 'checkout' },
        },
        products: buildProductData(cart.map((item) => item.product)),
      },
      // TODO: add user_properties object
      // TODO: add marketing object
    },
  })
}

export const dataLayerSignup = ({ customer, url }) => {
  const uniqueKey = uuidv4()
  let orderTotal = 0
  for (var i = 0; i < customer.orders?.edges?.length; i++) {
    orderTotal += parseFloat(customer.orders.edges[i].node.totalPriceV2.amount)
  }
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_sign_up',
      event_id: uniqueKey.toString(),
      user_properties: {
        customer_id: customer.id,
        customer_email: customer.email,
        customer_order_count: customer.orders.length.toString(),
        customer_total_spent: orderTotal.toString(),
        visitor_type: 'logged_in',
        user_consent: '',
        user_id: customer.id,
        // TODO: The user_id should be a uuid stored in session and should be persisted as long as possible ideally between user sessions
      },
      page: {
        url: url,
      },
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      // TODO: add marketing object
    },
  })
}

export const dataLayerLogin = ({ customer, url }) => {
  const uniqueKey = uuidv4()
  let orderTotal = 0
  for (var i = 0; i < customer.orders?.edges?.length; i++) {
    orderTotal += parseFloat(customer.orders.edges[i].node.totalPriceV2.amount)
  }
  TagManager.dataLayer({
    dataLayer: {
      event_id: uniqueKey.toString(),
      event: 'dl_login',
      page: {
        url: url,
      },
      user_properties: {
        customer_id: customer.id,
        customer_email: customer.email,
        customer_order_count: customer.orders.length.toString(),
        customer_total_spent: orderTotal.toString(),
        visitor_type: 'logged_in',
        user_consent: '',
        user_id: customer.id,
        // TODO: The user_id should be a uuid stored in session and should be persisted as long as possible ideally between user sessions
      },
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      // TODO: add marketing object
    },
  })
}

export const dataLayerViewProduct = ({ product, url, variantOption }) => {
  const uniqueKey = uuidv4()
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_view_item',
      // user_properties: user_properties,
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
      // TODO: add user_properties object
      // TODO: add marketing object
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
