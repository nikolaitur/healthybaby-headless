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
import { useRouter } from 'next/router'

import * as Cookies from 'es-cookie'

import Plus from '../../../svgs/plus.svg'
import Minus from '../../../svgs/minus.svg'
import Trash from '../../../svgs/trash.svg'

const LineItem = ({ item, content }) => {
  const [
    { cart },
    { incrementItem, decrementItem, removeFromCart, addToCart },
  ] = useCart()

  const router = useRouter()

  const [subscriptionPrice, setSubscriptionPrice] = useState(false)

  const cartDrawerContext = useCartDrawerContext()
  const { customer } = useCustomerContext()

  let isSubscription = false
  let hasSubscriptionProduct = false

  useEffect(() => {
    if (item.sellingPlan) {
      const sellingPlanPriceValue = JSON.parse(item.sellingPlan.value)
      const sellingPlanPrice =
        sellingPlanPriceValue[0].sellingPlan.priceAdjustments

      setSubscriptionPrice(
        sellingPlanPriceValue[0].priceAdjustments[0].price.amount
      )
    }
  }, [])

  const getOptions = () => {
    let singleVariant = true
    if (item.variant.selectedOptions.length > 0) {
      if (item.variant.selectedOptions[0].value == 'Default Title') {
        return false
      }
    }

    return true
  }

  const decrement = () => {
    if (item.quantity <= 1) {
      dataLayerRFC({ customer, item })
      removeFromCart(item)
    } else {
      decrementItem(item)
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
        cartDrawerContext.setCartTotal(cart.cost.totalAmount.amount)
        cartDrawerContext.setCartCount(cart.lines.reduce((sum, line) => {
            return sum + line.quantity
        }, 0))
    }
  }

  const upgradeToSubscription = async () => {
    if (item.sellingPlan) {
      const sellingPlanAllocationsValue = JSON.parse(item.sellingPlan.value)
      const sellingPlanId = `${sellingPlanAllocationsValue[0].sellingPlan.id}`

      let lineItem = {
        merchandiseId: item.nacelleEntryId,
        nacelleEntryId: item.nacelleEntryId,
        quantity: 1,
        sellingPlanId,
        // attributes: [{ key: 'subscription', value: sellingPlanId }]
      }

      dataLayerRFC({ customer, item })

      removeFromCart(item)

      const variant = getCartVariant({
        product: item.product,
        variant: item.selectedVariant,
      })

      const newItem = {
        product: item.product,
        variant,
        variantId: variant.id.replace('gid://shopify/ProductVariant/', ''),
        quantity: 1,
      }

      dataLayerATC({ customer, item: newItem, url: router.asPath })

      addToCart({
        merchandiseId: item.nacelleEntryId,
        nacelleEntryId: item.nacelleEntryId,
        sellingPlan: item.sellingPlan,
        subscription: true,
        quantity: 1,
        variant,
        product: item.product,
        selectedVariant: item.selectedVariant,
      })

      await cartClient
        .cartLinesAdd({
          cartId: cartDrawerContext.shopifyCartId,
          lines: [lineItem],
        })
        .then((data) => {
          console.log(data, 'Cart data')
        })
        .catch((err) => {
          console.error(err, 'Error')
        })
    }
  }

  const removeSubscription = () => {}

  return (
    <div className="line-item">
      <div className="line-item__wrapper">
        <div className="line-item__image">
          {item.variant.featuredMedia?.src ? (
              <Image
                  className=""
                  src={`${item.variant.featuredMedia.src}`}
                  alt={ item.variant.productTitle }
                  layout="responsive"
                  objectFit="cover"
                  height="132"
                  width="108"
              />
          ) : ""}
        </div>
        <div className="line-item__content">
          <div className="line-item__title">{item.variant.productTitle}</div>
          {getOptions() ? (
            <div className="line-item__option">
              {item.variant.selectedOptions[0].value}{' '}
              {item.variant.selectedOptions[1]?.value ? (
                <span>/ {item.variant.selectedOptions[1].value}</span>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
          <div className="line-item__price">
            <>
              {!item.sellingPlan ? (
                `$${Math.round(item.variant.price)}`
              ) : item.subscription && item.sellingPlan ? (
                <>
                  <span className="sale">
                    ${Math.round(subscriptionPrice)}
                  </span>{' '}
                  <span>
                    <s>${Math.round(item.variant.price)}</s>
                  </span>
                </>
              ) : (
                `$${Math.round(item.variant.price)}`
              )}
            </>
          </div>
          <div className="line-item__quantity">
            <div className="line-item__quantity--wrapper">
              <button
                onClick={() => decrement()}
                className="line-item__decrement"
              >
                <Minus />
              </button>
              <div className="line-item__count" aria-label="product quantity">
                {item.quantity}
              </div>
              <button
                onClick={() => incrementItem(item)}
                className="line-item__increment"
              >
                <Plus />
              </button>
            </div>
            <button
              onClick={() => {
                remove()
              }}
              className="line-item__trash"
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
      {!item.subscription && item.sellingPlan ? (
        <button
          className="line-item__upgrade"
          onClick={() => upgradeToSubscription()}
        >
          Upgrade to Subscribe & Save{' '}
          {content?.fields?.subscriptionDiscountPercent
            ? content.fields.subscriptionDiscountPercent
            : '7.5'}
          %
        </button>
      ) : (
        ''
      )}
      {item.subscription && item.sellingPlan ? (
        <button className="line-item__upgrade bold">
          Delivery Every 1 Month
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default LineItem
