import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import * as Cookies from 'es-cookie'

import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { useCart } from '@nacelle/react-hooks'
import { getCartVariant } from 'utils/getCartVariant'
import { useCustomerContext } from '@/context/CustomerContext'

import { useCartDrawerContext } from '../../../context/CartDrawerContext'

import { dataLayerATC } from '@/utils/dataLayer'
import { useRouter } from 'next/router'

const Upsell = ({ product, variantId }) => {
  const cartDrawerContext = useCartDrawerContext()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [{ cart }, { addToCart }] = useCart()
  const router = useRouter()
  const { customer } = useCustomerContext()

  let options = null
  if (product?.content?.options?.some((option) => option.values.length > 1)) {
    options = product?.content?.options
  }

  useEffect(() => {
    if (variantId) {
      let variant = product.variants.filter((variant) => {
        return (
          variant.content.sourceEntryId
            .split('gid://shopify/ProductVariant/')
            .pop() == variantId
        )
      })

      if (variant.length) {
        setSelectedVariant(variant[0])
        // console.log(variant[0])
      }
    }
  }, [])

  const handleAddItem = async () => {
    const variant = getCartVariant({
      product,
      variant: selectedVariant,
    })

    const newItem = {
      product,
      variant,
      variantId: variant.id.replace('gid://shopify/ProductVariant/', ''),
      quantity: 1,
    }

    dataLayerATC({ customer, item: newItem, url: router.asPath })

    let itemAttributes = [{ key: "_variantSku", value: variant.sku}, { key: "_productId", value: product.sourceEntryId}]

    let sellingPlan = selectedVariant.metafields.find(
        (metafield) => metafield.key === 'sellingPlanAllocations'
    )

    if(sellingPlan) {
        const sellingPlanAllocationsValue = JSON.parse(sellingPlan.value)
        const sellingPlanId = sellingPlanAllocationsValue[0].sellingPlan.id
        itemAttributes.push({ key: "_sellingPlan", value: sellingPlanId})
    }

    const { cart, userErrors, errors } = await cartClient.cartLinesAdd({
        cartId: Cookies.get('shopifyCartId'),
        lines: [
            {
              merchandiseId: selectedVariant.nacelleEntryId,
              nacelleEntryId: selectedVariant.nacelleEntryId,
              quantity: 1,
              attributes: itemAttributes,
            },
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

  return product && selectedVariant ? (
    <div className="upsell">
      <div className="upsell__container">
        <div className="upsell__image">
          <Image
            className=""
            src={`${selectedVariant.content.featuredMedia.src}`}
            alt={product.content.title}
            layout="responsive"
            objectFit="cover"
            height="90"
            width="72"
          />
        </div>
        <div className="upsell__wrapper">
          <div className="upsell__content">
            <div className="upsell__title">{product.content.title}</div>
            {selectedVariant.content.title !== 'Default Title' ? (
              <div className="upsell__option">
                {selectedVariant.content.title}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="upsell__add-to-cart">
            <div className="upsell__price">${selectedVariant.price}</div>
            <button className="btn secondary" onClick={() => handleAddItem()}>
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default Upsell
