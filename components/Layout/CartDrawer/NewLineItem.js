import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { useCart } from '@nacelle/react-hooks'
import { getCartVariant } from 'utils/getCartVariant'

import { useCartDrawerContext } from '../../../context/CartDrawerContext'

import { dataLayerATC, dataLayerRFC } from '@/utils/dataLayer'

import * as Cookies from 'es-cookie'

import Plus from '../../../svgs/plus.svg'
import Minus from '../../../svgs/minus.svg'
import Trash from '../../../svgs/trash.svg'

const NewLineItem = ({ item, content }) => {
  const [
    { cart },
    { incrementItem, decrementItem, removeFromCart, addToCart },
  ] = useCart()

  const [subscriptionPrice, setSubscriptionPrice] = useState(false)
  const [isSubscription, setIsSubscription] = useState(false)
  const [hasSubscriptionProduct, sethasSubscriptionProduct] = useState(false)

  const cartDrawerContext = useCartDrawerContext()

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
        if (Object.values(attribute).includes("subscription")) { return attribute } else return false
    }))

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
    }
  }

  const decrement = async () => {
    if (item.quantity <= 1) {
      dataLayerRFC({ item })
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
        }
    }
  }

  const remove = async () => {
    dataLayerRFC({ item })
    removeFromCart(item)

    const { cart, userErrors, errors } = await cartClient.cartLinesRemove({
        cartId: Cookies.get('shopifyCartId'),
        lineIds: [item.id]
    });

    if(cart) {
        cartDrawerContext.setShopifyCart(cart)
    }
  }

  const upgradeToSubscription = async () => {
    if (hasSubscriptionProduct.length > 0) {
     
    //   const sellingPlanAllocationsValue = JSON.parse(item.sellingPlan.value)
    //   const sellingPlanId = `${sellingPlanAllocationsValue[0].sellingPlan.id}`
      const sellingPlanId = hasSubscriptionProduct[0].value

      let lineItem = {
        merchandiseId: item.merchandise.nacelleEntryId,
        nacelleEntryId: item.merchandise.nacelleEntryId,
        quantity: 1,
        sellingPlanId,
        attributes: [{ key: 'subscription', value: sellingPlanId }]
      }

      dataLayerRFC({ item })

      remove()

      const variant = getCartVariant({
        product: item.merchandise.product,
        variant: item.selectedVariant,
      })

      const newItem = {
        product: item.product,
        variant,
        variantId: item.merchandise.sourceEntryId.replace('gid://shopify/ProductVariant/', ''),
        quantity: 1,
      }

      // dataLayerATC({ item: newItem })

      const { cart, userErrors, errors } = await cartClient.cartLinesAdd({
        cartId: Cookies.get('shopifyCartId'),
        lines: [lineItem],
      });

      console.log( cart, userErrors, errors )

      if(cart) {
        console.log("Subscription")
        cartDrawerContext.setShopifyCart(cart)
      }

    }
  }

  const removeSubscription = () => {}

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
                `$${Number(item.cost.totalAmount.amount).toFixed(2)}` : 
                item.attributes.map((attribute, index) => Object.values(attribute).includes("subscription")) && item.cost.compareAtAmountPerQuantity?.amount ? (
                    <><span className="sale">${Number(item.cost.totalAmount.amount).toFixed(2)}</span> <span><s>${Number(item.cost.compareAtAmountPerQuantity.amount).toFixed(2)}</s></span></>
                ) : `$${Number(item.cost.totalAmount.amount).toFixed(2)}`
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
        <button
          className="line-item__upgrade"
          onClick={() => upgradeToSubscription()}
        >
          Upgrade to Subscribe & Save {content?.fields?.subscriptionDiscountPercent ? content.fields.subscriptionDiscountPercent : "7.5"}%
        </button>
      ) : (
        ''
      )}
      {isSubscription.length > 0 ? (
        <button className="line-item__upgrade bold">
          Delivery Every 1 Month
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default NewLineItem
