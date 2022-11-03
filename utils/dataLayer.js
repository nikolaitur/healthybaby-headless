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

  let orderTotal = 0
  for (var i = 0; i < customer?.orders?.edges?.length; i++) {
    orderTotal += parseFloat(customer.orders.edges[i].node.totalPriceV2.amount)
  }
  customerProps = {
    ...customerProps,
    customer_order_count: customer?.orders?.length.toString() || '0',
    customer_total_spent: orderTotal.toString(),
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
  return customerProps
}

function getMarketingData() {
  const marketingProps = {
    crto_is_user_optout: 'false', // Criteo opt out status
    user_id: Cookies.get('elevar_user_id') || (() => {
      const elevarUserId = uuidv4()
      Cookies.set('elevar_user_id', elevarUserId, {path: '/'})
      return elevarUserId
    })()
  }

  const cookieArray = [
    '_ga_T2Z4QVLW4Q', // GA4 Cookie ID
    '_fbp', // FB cookie id
    '_fbc', // FB cookie id if available
    '_ga', // GA cookie id
    '_gaexp', // Optimize cookie id if available
    '_gid', // GA cookie id if available
    '__utma', // GA cookie id if available
    'ttclid', // TikTok cookie ID if using TikTok
    'crto_mapped_user_id' // Criteo cookie id if using Criteo
  ]
  cookieArray.forEach(item => {
    const cookieVal = Cookies.get(item) || ''
    if (cookieVal) {
      marketingProps[item] = cookieVal
    }
  })

  return marketingProps
}

function buildProductData(products, type, url, forceIndex) {
  return products.map((product, index) => {
    const firstVariant = product.variants[0]
    const data = {
      id: firstVariant.sku, // SKU
      name: product.content.title, // Product title
      brand: 'Healthy Baby',
      category: product.productType || '',
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
      data['position'] = forceIndex || index + 1 // position in the list of search results, collection views and position in cart indexed starting at 1
    }

    return data
  })
}

function buildProductCartData(cart, dataType = 'products') {
  const lineItems = cart.lines
  return lineItems.map((line, index) => {

    let variantSku = line.attributes.filter(attribute => {
      if (Object.values(attribute).includes("_variantSku")) { return attribute } else return false
    })

    let productId = line.attributes.filter(attribute => {
      if (Object.values(attribute).includes("_productId")) { return attribute } else return false
    })

    let category = line.attributes.filter(attribute => {
      if (Object.values(attribute).includes("_productType")) { return attribute } else return false
    })

    let data = {
      id: ( variantSku && variantSku.length ) ? variantSku[0].value : "", // SKU
      name: line.merchandise.product.title, // Product title
      brand: 'Healthy Baby',
      category: category && category[0] ? category[0].value : '',
      variant: line.merchandise.title,
      price: line.cost.totalAmount.amount.toString(),
      quantity: line.quantity.toString(),
      product_id: ( productId && productId.length ) ?  productId[0].value.replace('gid://shopify/Product/', '') : "", // The product_id
      variant_id: line.merchandise.sourceEntryId.replace(
        'gid://shopify/ProductVariant/',
        ''
      ), // id or variant_id
      compare_at_price: line.cost?.compareAtAmountPerQuantity?.amount.toString() || '', // If available on dl_view_item & dl_add_to_cart otherwise use an empty string
      image: line.merchandise.image?.url || '', // If available, otherwise use an empty string
    }

    if (dataType === 'impressions') {
      data = {
        name: line.merchandise.product.title, // Product title
        brand: 'Healthy Baby',
        category: category && category[0] ? category[0].value : '',
        product_id: ( productId && productId.length ) ?  productId[0].value.replace('gid://shopify/Product/', '') : "", // The product_id
        id: ( variantSku && variantSku.length ) ? variantSku[0].value : "", // SKU
        price: line.cost.totalAmount.amount.toString(),
        variant_id: line.merchandise.sourceEntryId.replace(
          'gid://shopify/ProductVariant/',
          ''
        ), // id or variant_id
        image: line.merchandise.image?.url || '', // If available, otherwise use an empty string
        list: 'Shopping Cart',
        position: (index + 1).toString(),
      }
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
    category: product.productType,
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
  const products = buildProductCartData(cart)
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_user_data',
      device,
      event_id: uniqueKey.toString(),
      user_properties,
      marketing: getMarketingData(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      cart_total: cart?.cost?.subtotalAmount?.amount || '0',
      page: {
        url: url,
      },
      ecommerce: {
        currencyCode: 'USD',
        cart_contents: {
          products
        },
      },
    },
  })
}

export const dataLayerATC = ({ customer, item, url }) => {
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
              category: item.product.productType,
              variant: item.variant.title,
              price: item.variant.price.toString(),
              quantity: item.quantity,
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
  let variantSku = item.attributes.filter(attribute => {
    if (Object.values(attribute).includes("_variantSku")) { return attribute } else return false
  })

  let productId = item.attributes.filter(attribute => {
    if (Object.values(attribute).includes("_productId")) { return attribute } else return false
  })

  let category = item.attributes.filter(attribute => {
    if (Object.values(attribute).includes("_productType")) { return attribute } else return false
  })

  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)

  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_remove_from_cart',
      event_id: uniqueKey.toString(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      ecommerce: {
        currencyCode: 'USD',
        remove: {
          actionField: { list: location.pathname, 'action': 'remove' },
          products: [
            {
              id: ( variantSku && variantSku.length ) ? variantSku[0].value : "", // SKU
              name: item.merchandise.product.title, // Product title
              brand: 'Healthy Baby',
              category: category && category[0] ? category[0].value : '',
              variant: item.merchandise.title,
              price: item.cost.amountPerQuantity.amount.toString(),
              quantity: item.quantity,
              product_id: ( productId && productId.length ) ?  productId[0].value.replace('gid://shopify/Product/', '') : "", // The product_id
              variant_id: item.merchandise.sourceEntryId
                .split('gid://shopify/ProductVariant/')
                .pop(), // id or variant_id
              compare_at_price: item.cost.compareAtAmountPerQuantity?.amount?.toString() || '', // If available on dl_view_item & dl_add_to_cart otherwise use an empty string
              image: item.merchandise.image?.url || '', // If available, otherwise use an empty string
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
            category: item.productType,
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
export const dataLayerSelectProduct = ({ customer, product, url, index }) => {
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
          products: buildProductData([product], 'collection', url, index),
        },
      },
    },
  })
}

export const dataLayerViewCart = ({ customer, cart, url }) => {
  const products = buildProductCartData(cart, 'impressions')
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)

  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_view_cart',
      event_id: uniqueKey.toString(),
      user_properties,
      marketing: getMarketingData(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      cart_total: cart?.cost?.subtotalAmount?.amount || '0',
      ecommerce: {
        currencyCode: 'USD',
        actionField: { list: 'Shopping Cart' },
        impressions: products
      },
    },
  })
}

export const dataLayerBeginCheckout = ({ customer, cart }) => {
  const products = buildProductCartData(cart)
  const uniqueKey = uuidv4()
  const user_properties = getUserProperties(customer)
  TagManager.dataLayer({
    dataLayer: {
      event: 'dl_begin_checkout',
      event_id: uniqueKey.toString(),
      user_properties,
      marketing: getMarketingData(),
      event_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Timestamp for the event
      cart_total: cart?.cost?.subtotalAmount?.amount || '0',
      ecommerce: {
        checkout: {
          actionField: { step: '1', action: 'checkout' },
        },
        products
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

export const dataLayerViewProduct = ({ customer, product, url, variantOption, index }) => {
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
            : buildProductData([product], 'product', url, index),
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
