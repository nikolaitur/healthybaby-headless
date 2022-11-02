import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { NacelleCartInput, CartResponse } from '@nacelle/shopify-cart'

import { useCart, useCheckout } from '@nacelle/react-hooks'
import { useCartDrawerContext } from '../../../context/CartDrawerContext'
import { dataLayerBeginCheckout } from '@/utils/dataLayer'
import { useCustomerContext } from '@/context/CustomerContext'
import { GET_PRODUCTS } from 'gql'

import * as Cookies from 'es-cookie'

import LineItem from './LineItem'
import NewLineItem from './NewLineItem'
import Upsell from './Upsell'

import IconClose from '../../../svgs/close-icon.svg'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const CartDrawer = ({ content }) => {
  const [
    { cart },
    { incrementItem, decrementItem, removeFromCart, clearCart, addToCart },
  ] = useCart()

  // The `processCheckout` method, which allows for cart data
  // to be passed to the checkout client, is provided by the
  // `useCheckout` hook from `@nacelle/react-hooks`.
  // (https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks)
  const [, { processCheckout }] = useCheckout()

  const [drawerContent, setDrawerContent] = useState(false)
  const [upsells, setUpsells] = useState(false)
  const [upsellsData, setUpsellsData] = useState({ products: [], variants: [] })
  const { customer } = useCustomerContext()
  const [shopifyCartData, setShopifyCartData] = useState(false)
  const cartDrawerContext = useCartDrawerContext()
  const cartDrawerContent = cartDrawerContext.content[0]

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

  const cartItemTotal = cart.reduce((sum, lineItem) => {
    return sum + lineItem.quantity
  }, 0)

  let freeShipping = false
  const freeShippingLimit = 100
  const freeShippingDistance = Math.abs(
    Number(cartDrawerContext.cartTotal) - freeShippingLimit + freeShippingLimit
  )

  if (Number(cartDrawerContext.cartTotal) > freeShippingLimit) {
    freeShipping = true
  }

  useEffect(() => {
    const getCartClient = async () => {
        const cartData = await cartClient.cart({
            cartId: Cookies.get('shopifyCartId')
        });

        cartDrawerContext.setShopifyCart(cartData.cart)
        cartDrawerContext.setCartTotal(cartData.cart?.cost?.totalAmount?.amount || 0)
        cartDrawerContext.setCartCount(cartData.cart?.lines?.reduce((sum, line) => {
            return sum + line.quantity
        }, 0) || 0)
    }
    getCartClient()
  }, [cartDrawerContext.isOpen])

  useEffect(() => {
    setDrawerContent(content)
  }, [content])

  useEffect(() => {
    const getUpsells = async () => {
      const productList = drawerContent[0].fields.upsells.map(
        (product) => product.fields.handle.replace('::en-US', '')
      )
      const productVariants = drawerContent[0].fields.upsells.map((product) =>
        product.fields?.variantId ? product.fields.variantId : false
      )

      nacelleClient.query({
        query: GET_PRODUCTS,
        variables: {
          "filter": {
            "handles": productList
          }
        }
      }).then(({products}) => {
          setUpsells(true)
          setUpsellsData({
            products,
            variants: productVariants,
          })
        })
    }

    if (drawerContent[0]) {
      getUpsells()
    }
  }, [upsells, drawerContent])

  const closeSlide = () => {
    cartDrawerContext.setIsOpen(false)
  }

  const getUtmAttributes = () => {
    const trackingObj = {}
    const utmVars = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'gclid',
      'fbclid',
      'ttclid',
      'irclickid'
    ]
    utmVars.forEach((key) => {
      const item = localStorage.getItem(key)
      if (item) {
        trackingObj[key] = item
      }
    })
    return trackingObj
  }

  const getCartAttributes = () => {
    const metafields = []

    metafields.push({
      key: "_elevar_visitor_info",
      value: JSON.stringify(getUtmAttributes())
    },)

    if (Cookies.get('_fbp')) {
      metafields.push({ key: '_elevar__fbp', value: Cookies.get('_fbp') })
    }
    if (Cookies.get('_fbc')) {
      metafields.push({ key: '_elevar__fbc', value: Cookies.get('_fbc') })
    }
    if (Cookies.get('_ga')) {
      metafields.push({ key: '_elevar__ga', value: Cookies.get('_ga') })
    }
    const gaSuffix = 'T2Z4QVLW4Q'
    if (Cookies.get(`_ga_${gaSuffix}`)) {
      metafields.push({
        key: `_elevar__ga_${gaSuffix}`,
        value: Cookies.get(`_ga_${gaSuffix}`)
      })
    }

    return metafields
  }

  const handleProcessCheckout = async () => {
    const attributes = getCartAttributes()

    dataLayerBeginCheckout({
      customer,
      cart: cartDrawerContext.shopifyCart
    })

    const cartItems = cartDrawerContext.shopifyCart.lines.map((lineItem) => {
        const returnItem = {
            merchandiseId: lineItem.merchandise.nacelleEntryId,
            nacelleEntryId: lineItem.merchandise.nacelleEntryId,
            quantity: lineItem.quantity,
        }

        let subscription = lineItem.attributes.filter(attribute => {
            if (Object.values(attribute).includes("subscription")) { return attribute } else return false
        })

        if(subscription[0]) {
            const sellingPlanId = subscription[0].value

            returnItem.sellingPlanId = sellingPlanId
            returnItem.attributes = [{ key: 'subscription', value: sellingPlanId }]
        }

        return returnItem
    })

    const lines = cartItems

    await cartClient
      .cartCreate({
        lines,
        attributes
      })
      .then((response) => {
        if (response.cart?.checkoutUrl) {
          window.location.href = response.cart.checkoutUrl
        }
      })
  }

  return (
    <div className={`cart-drawer ${cartDrawerContext.isOpen ? 'active' : ''}`}>
      <div className="cart-drawer__overlay" onClick={() => closeSlide()}></div>
      <div className={`cart-drawer__container`}>
        <div className="cart-drawer__content">
          {cartDrawerContent?.fields.marketingMessage ? (
            <div className="cart-drawer__messaging">
              {cartDrawerContent.fields.marketingMessage}
            </div>
          ) : (
            ''
          )}

          <div className="cart-drawer__header">
            <div className="cart-drawer__title">
              Your Bag <span>{cartDrawerContext.cartCount}</span>
            </div>
            <div className="cart-drawer__close" onClick={() => closeSlide()}>
              <IconClose />
            </div>
          </div>
          <div
            className={`cart-drawer__shipping ${freeShipping ? 'free' : ''}`}
          >
            <span className="message">
              {freeShipping ? (
                <>
                    {cartDrawerContent?.fields.shippingThreshold ? (
                        <span><strong>{cartDrawerContent.fields.shippingThreshold}</strong></span>
                    ) : (
                        <span><strong>You’ve earned free shipping!</strong></span>
                    )}
                </>
              ) : (
                <span>
                  <strong>
                    ${(freeShippingLimit - Number(cartDrawerContext.cartTotal)).toFixed(2)}
                  </strong>{' '}
                  away from complimentary shipping
                </span>
              )}
            </span>
            <span className="border">
              <span
                className="progress-bar"
                style={{ width: freeShippingDistance + '%' }}
              ></span>
            </span>
          </div>
          {cartDrawerContext.shopifyCart && cartDrawerContext.shopifyCart?.lines?.length ? (
            <>
                <div className="cart-drawer__items">
                    {cartDrawerContext.shopifyCart.lines.map((lineItem, index) => (
                        <NewLineItem item={lineItem} content={drawerContent[0]} key={index} />
                    ))}
                </div>
                {drawerContent[0] ? (
                drawerContent[0].fields.upsells.length > 1 ? (
                  <div className="cart-drawer__upsells">
                    <div className="cart-drawer__upsells--title">
                      Pair with these essentials:
                    </div>
                    <div className="cart-drawer__upsells--wrapper">
                      {upsells
                        ? upsellsData.products.map((upsell, index) => (
                            <Upsell
                              key={index}
                              product={upsell}
                              variantId={upsellsData.variants[index]}
                            />
                          ))
                        : ''}
                    </div>
                  </div>
                ) : ('')
              ) : ('')}
              <div className="cart-drawer__checkout">
                <button
                  className="btn secondary full-width"
                  onClick={handleProcessCheckout}
                >
                  <span>{`Checkout - $${Math.round(Number(cartDrawerContext.cartTotal).toFixed(2))}`}</span>
                </button>
              </div>
            </>

          ) : (
            <div className="cart-drawer__empty">Your bag is empty</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
