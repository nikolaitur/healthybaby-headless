import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { useCart } from '@nacelle/react-hooks'
import { getCartVariant } from 'utils/getCartVariant'

import { useCartDrawerContext } from '../../../context/CartDrawerContext'
import { useCustomerContext } from '@/context/CustomerContext'

import { dataLayerATC, dataLayerRFC } from '@/utils/dataLayer'

import * as Cookies from 'es-cookie'

import Plus from '../../../svgs/plus.svg'
import Minus from '../../../svgs/minus.svg'
import Trash from '../../../svgs/trash.svg'
import LineItemDropdown from '../../../svgs/line-item-dropdown.svg'

const NewLineItem = ({ item, content }) => {
  const [
    { cart },
    { incrementItem, decrementItem, removeFromCart, addToCart },
  ] = useCart()

  const [subscriptionPrice, setSubscriptionPrice] = useState(false)
  const [isSubscription, setIsSubscription] = useState(false)
  const [hasSubscriptionProduct, sethasSubscriptionProduct] = useState(false)
  const [subscriptionDiscount, setSubscriptionDiscount] = useState(false)
  const [subscriptionCadence, setsubscriptionCadence] = useState(false)

  const cartDrawerContext = useCartDrawerContext()
  const { customer } = useCustomerContext()

  useEffect(() => {
    if (item.sellingPlan) {
      const sellingPlanPriceValue = JSON.parse(item.sellingPlan.value)
      const sellingPlanPrice =
        sellingPlanPriceValue[0].sellingPlan.priceAdjustments

      setSubscriptionPrice(
        sellingPlanPriceValue[0].priceAdjustments[0].price.amount
      )
    }

    sethasSubscriptionProduct(item.attributes.filter(attribute => {
        if (Object.values(attribute).includes("_sellingPlan")) { return attribute } else return false
    }))
    setIsSubscription(item.attributes.filter(attribute => {
        if (Object.values(attribute).includes("_subscription")) { return attribute } else return false
    }))
    setSubscriptionDiscount(item.attributes.filter(attribute => {
        if (Object.values(attribute).includes("_subscriptionDiscount")) { return attribute } else return false
    }))

    console.log(item)
  }, [])

  const getOptions = () => {
    if(item.merchandise.title == 'Default Title') {
        return false
    }

    return true
  }

  const increment = async () => {
    const { cart, userErrors, errors } = await cartClient.cartLinesUpdate({
        cartId: Cookies.get('shopifyCartId'),
        lines: [
          {
            id: item.id,
            nacelleEntryId: item.merchandise.nacelleEntryId,
            quantity: ++item.quantity
          }
        ]
    });

    if(cart) {
        cartDrawerContext.setShopifyCart(cart)
        cartDrawerContext.setCartTotal(cart.cost.totalAmount.amount)
        cartDrawerContext.setCartCount(cart.lines.reduce((sum, line) => {
            return sum + line.quantity
        }, 0))
    }
  }

  const decrement = async () => {
    if (item.quantity <= 1) {
      // dataLayerRFC({ customer, item })
      remove()
    } else {
        const { cart, userErrors, errors } = await cartClient.cartLinesUpdate({
            cartId: Cookies.get('shopifyCartId'),
            lines: [
              {
                id: item.id,
                nacelleEntryId: item.merchandise.nacelleEntryId,
                quantity: --item.quantity
              }
            ]
        });

        if(cart) {
            cartDrawerContext.setShopifyCart(cart)
            cartDrawerContext.setCartTotal(cart.cost.totalAmount.amount)
            cartDrawerContext.setCartCount(cart.lines.reduce((sum, line) => {
                return sum + line.quantity
            }, 0))
        }
    }
  }

  const remove = async () => {
    dataLayerRFC({ customer, item })
    removeFromCart(item)

    const { cart, userErrors, errors } = await cartClient.cartLinesRemove({
        cartId: Cookies.get('shopifyCartId'),
        lineIds: [item.id]
    });

    if(cart) {
        cartDrawerContext.setShopifyCart(cart)
        cartDrawerContext.setCartTotal(cart.cost.totalAmount.amount)
        cartDrawerContext.setCartCount(cart.lines.reduce((sum, line) => {
            return sum + line.quantity
        }, 0))
        return cart
    }
  }

  const upgradeToSubscription = async () => {
    if (hasSubscriptionProduct.length > 0) {

      const sellingPlanId = hasSubscriptionProduct[0].value

      let variantSku = item.attributes.filter(attribute => {
        if (Object.values(attribute).includes("_variantSku")) { return attribute } else return false
      })

      let productId = item.attributes.filter(attribute => {
        if (Object.values(attribute).includes("_productId")) { return attribute } else return false
      })

      let lineAttributes = [
        { key: '_subscription', value: sellingPlanId },
        { key: "_variantSku", value: variantSku[0].value},
        { key: "_productId", value: productId[0].value}
      ]

      if(subscriptionDiscount) {
        lineAttributes.push({ key: '_subscriptionDiscount', value: subscriptionDiscount[0].value.toString() })
      }

      let lineItem = {
        merchandiseId: item.merchandise.nacelleEntryId,
        nacelleEntryId: item.merchandise.nacelleEntryId,
        quantity: 1,
        sellingPlanId,
        attributes: lineAttributes
      }

      dataLayerRFC({ customer, item })

      remove()
        .then((cartResponse) => {
            const addItem = async () => {
                const { cart, userErrors, errors } = await cartClient.cartLinesAdd({
                    cartId: Cookies.get('shopifyCartId'),
                    lines: [lineItem],
                });

                if(cart) {
                    cartDrawerContext.setShopifyCart(cart)
                    cartDrawerContext.setCartTotal(cart.cost.totalAmount.amount)
                    cartDrawerContext.setCartCount(cart.lines.reduce((sum, line) => {
                        return sum + line.quantity
                    }, 0))
                }
            }

            addItem()
        })
    }
  }

  const removeSubscription = () => {
    setsubscriptionCadence(!subscriptionCadence)
 
    if (isSubscription.length > 0) {
        const sellingPlanId = isSubscription[0].value

        let variantSku = item.attributes.filter(attribute => {
          if (Object.values(attribute).includes("_variantSku")) { return attribute } else return false
        })
  
        let productId = item.attributes.filter(attribute => {
          if (Object.values(attribute).includes("_productId")) { return attribute } else return false
        })
  
        let lineAttributes = [
          { key: '_sellingPlan', value: sellingPlanId },
          { key: "_variantSku", value: variantSku[0].value},
          { key: "_productId", value: productId[0].value}
        ]
  
        if(subscriptionDiscount) {
          lineAttributes.push({ key: '_subscriptionDiscount', value: subscriptionDiscount[0].value.toString() })
        }
  
        let lineItem = {
          merchandiseId: item.merchandise.nacelleEntryId,
          nacelleEntryId: item.merchandise.nacelleEntryId,
          quantity: 1,
          attributes: lineAttributes
        }
  
        dataLayerRFC({ customer, item })

        remove()
            .then((cartResponse) => {
                const addItem = async () => {
                    const { cart, userErrors, errors } = await cartClient.cartLinesAdd({
                        cartId: Cookies.get('shopifyCartId'),
                        lines: [lineItem],
                    });

                    console.log(cart, userErrors, errors)

                    if(cart) {
                        cartDrawerContext.setShopifyCart(cart)
                        cartDrawerContext.setCartTotal(cart.cost.totalAmount.amount)
                        cartDrawerContext.setCartCount(cart.lines.reduce((sum, line) => {
                            return sum + line.quantity
                        }, 0))
                    }
                }

                addItem()
        })
    }
  }

  return (
    <div className="line-item">
      <div className="line-item__wrapper">
        <div className="line-item__image">
            {item.merchandise.image?.url ? (
                <Image
                    className=""
                    src={`${item.merchandise.image.url}`}
                    alt={ item.merchandise.product.title }
                    layout="responsive"
                    objectFit="cover"
                    height="132"
                    width="108"
                />
            ) : ""}
        </div>
        <div className="line-item__content">
          <div className="line-item__title">{ item.merchandise.product.title }</div>
          {getOptions() ? (
            <div className="line-item__option">
              {item.merchandise.title}
            </div>
          ) : ('')}
          <div className="line-item__price">
            <>
              {!item.attributes.length ?
                `$${Math.round(Number(item.cost.totalAmount.amount).toFixed(2))}` :
                item.attributes.map((attribute, index) => Object.values(attribute).includes("subscription")) && item.cost.compareAtAmountPerQuantity?.amount ? (
                    <><span className="sale">${Math.round(Number(item.cost.totalAmount.amount).toFixed(2))}</span> <span><s>${Math.round(Number(item.cost.compareAtAmountPerQuantity.amount).toFixed(2)) * item.quantity}</s></span></>
                ) : `$${Math.round(Number(item.cost.totalAmount.amount).toFixed(2))}`
              }
            </>
          </div>
          <div className="line-item__quantity">
            <div className="line-item__quantity--wrapper">
              <button onClick={() => decrement()} className="line-item__decrement">
                <Minus />
              </button>
              <div className="line-item__count" aria-label="product quantity">
                {item.quantity}
              </div>
              <button onClick={() => increment()} className="line-item__increment">
                <Plus />
              </button>
            </div>
            <button onClick={() => { remove() }} className="line-item__trash">
              <Trash />
            </button>
          </div>
        </div>
      </div>

      {hasSubscriptionProduct.length > 0 ? (
        <div className="line-item__upgrade" onClick={() => upgradeToSubscription()}>
            <div className="line-item__upgrade--wrapper">
                <input type="checkbox"></input>
                <div>
                    <span className="bold">
                        Upgrade to Subscribe & Save {' '}
                        {subscriptionDiscount ? `${subscriptionDiscount[0].value}` : content?.fields?.subscriptionDiscountPercent ? content.fields.subscriptionDiscountPercent : "7.5"}%
                    </span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                </div>
            </div>          
        </div>
      ) : ('')}

      {isSubscription.length > 0 ? (
        <>
            <div className="line-item__delivery bold" onClick={() => setsubscriptionCadence(!subscriptionCadence)}>
                <span>Delivery Every 1 Month</span>
                <span><LineItemDropdown/></span>
            </div>
            <div className={`line-item__dropdown ${subscriptionCadence ? "active" : ""}`} onClick={() => removeSubscription()}>
                One-Time Purchase
            </div>
        </>
      ) : ('')}
    </div>
  )
}

export default NewLineItem
