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
      data['position'] = index.toString() // position in the list of search results, collection views and position in cart indexed starting at 1
    }

    return data
  })
}

export const dataLayerUserData = ({ cart, customer, url }) => {
  console.log('dl_user_data')
  const uniqueKey = uuidv4()
  let user_properties = {
    visitor_type: 'guest',
    user_consent: '',
    user_id: uniqueKey.toString(),
  }

  if (customer) {
    user_properties = {
      customer_id: customer.id,
      customer_email: customer.email,
      customer_order_count: customer.orders.length.toString(),
      customer_total_spent: orderTotal.toString(),
      visitor_type: 'logged_in',
      user_consent: '',
      user_id: customer.id,
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
      event_id: uniqueKey.toString(),
      user_properties: user_properties,
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      cart_total: cartSubtotal.toString(),
      page: {
        url: url,
      },
      ecommerce: {
        cart_contents: {
          currencyCode: 'USD',
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

export const dataLayerATC = ({ item, url }) => {
  console.log('dl_add_to_cart')
  const uniqueKey = uuidv4()
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_add_to_cart',
      event_id: uniqueKey.toString(),
      currencyCode: 'USD',
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        add: {
          actionField: { list: url },
          products: [
            {
              id: item.variant.sku, // SKU
              name: item.variant.productTitle, // Product title
              brand: 'Healthy Baby',
              category: '',
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
    },
  })
}

/*
  - this is for removing from cart
*/
export const dataLayerRFC = ({ item }) => {
  console.log('dl_remove_from_cart')
  const uniqueKey = uuidv4()
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_remove_from_cart',
      event_id: uniqueKey.toString(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        remove: {
          products: [item.product],
        },
      },
    },
  })
}

export const dataLayerViewProductList = ({ products, url }) => {
  console.log('dl_view_item_list')
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
    },
  })
}

export const dataLayerViewSearchResults = ({ products }) => {
  console.log('dl_view_search_results')
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
            name: item.Title, // Product title
            brand: 'Healthy Baby',
            category: '',
            product_id: item.sourceEntryId
              .split('gid://shopify/Product/')
              .pop(), // The product_id
            id: item.sourceEntryId.split('gid://shopify/Product/').pop(),
            price: item.variants[0].price,
            variant_id: item.variants[0].sourceEntryId
              .split('gid://shopify/ProductVariant/')
              .pop(), // id or variant_id
            image: item.content?.featuredMedia?.src || '', // If available, otherwise use an empty string
            list: '/shop-all',
            position: index.toString(),
          }
        }),
      },
    },
  })
}

/*
  Use this for selecting products from collections/search results
*/
export const dataLayerSelectProduct = ({ product, url }) => {
  const uniqueKey = uuidv4()
  console.log('dl_select_item')
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
    },
  })
}

export const dataLayerViewCart = ({ cart, url }) => {
  console.log('dl_view_cart')
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
          cart.map((item) => item.product),
          'collection',
          url
        ),
      },
    },
  })
}

export const dataLayerBeginCheckout = ({ cart }) => {
  console.log('dl_begin_checkout')
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_begin_checkout',
      // user_properties: user_properties,
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      cart_total: formatPrice(cart.order_total).toString(),
      ecommerce: {
        checkout: {
          actionField: { step: 'Final', action: 'checkout' },
        },
        products: buildProductData(cart.map((item) => item.product)),
      },
    },
  })
}

export const dataLayerSignup = ({ customer, url }) => {
  console.log('dl sign up')
  console.log(customer)
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
      },

      page: {
        url: url,
      },
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
    },
  })
}

export const dataLayerLogin = ({ customer, url }) => {
  const uniqueKey = uuidv4()
  console.log('dl_login')
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
      },
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
    },
  })
}

export const dataLayerViewProduct = ({ product, url }) => {
  const uniqueKey = uuidv4()
  console.log('dl_view_item')
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
          products: buildProductData([product]),
        },
      },
    },
  })
}

export const dataLayerRouteChange = ({ url }) => {
  console.log('dl_route_change')
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_route_change',
      url: url,
    },
  })
}
