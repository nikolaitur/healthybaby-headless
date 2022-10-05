import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { useCart } from '@nacelle/react-hooks'
import { getCartVariant } from 'utils/getCartVariant'

import { useCartDrawerContext } from '../../../context/CartDrawerContext'

import Plus from '../../../svgs/plus.svg'
import Minus from '../../../svgs/minus.svg'
import Trash from '../../../svgs/trash.svg'

const LineItem = ({item}) => {
    const [
        { cart },
        { incrementItem, decrementItem, removeFromCart, addToCart },
    ] = useCart()

    const cartDrawerContext =  useCartDrawerContext()

    console.log(item, "item")

    let isSubscription = false
    let hasSubscriptionProduct = false

    const getOptions = () => {
        let singleVariant = true
        if(item.variant.selectedOptions.length > 0) {
            if(item.variant.selectedOptions[0].value == "Default Title") {
                return false
            }
        }

        return true
    }

    const decrement = () => {
        if (item.quantity <= 1) {
            removeFromCart(item)
        } else {
            decrementItem(item)
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

            removeFromCart(item)

            const variant = getCartVariant({
                product: item.product,
                variant: item.selectedVariant
            })
            
            addToCart({
                merchandiseId: item.nacelleEntryId,
                nacelleEntryId: item.nacelleEntryId,
                sellingPlan: item.sellingPlan,
                subscription: true,
                quantity: 1,
                variant,
                product: item.product,
                selectedVariant: item.selectedVariant
            })

            await cartClient.cartLinesAdd({
                cartId: cartDrawerContext.shopifyCartId,
                lines: [
                    lineItem    
                ]
              })
              .then((data) => {
                console.log(data, "Cart data")
              })
              .catch((err) => {
                console.error(err, "Error")
              })
        }
    }

    const removeSubscription = () => {

    }

  return (
    <div className="line-item">
        <div className="line-item__wrapper">
            <div className="line-item__image">
                <Image
                    className=""
                    src={`${item.variant.featuredMedia.src}`}
                    alt={ item.variant.productTitle }
                    layout="responsive"
                    objectFit="cover"
                    height="132"
                    width="108"
                />
            </div>
            <div className="line-item__content">
                <div className="line-item__title">{ item.variant.productTitle }</div>
                {getOptions() ? (
                    <div className="line-item__option">{ item.variant.selectedOptions[0].value } {item.variant.selectedOptions[1]?.value ? <span>/ {item.variant.selectedOptions[1].value}</span> : ""}</div>
                ) : ""}
                <div className="line-item__price">${ (item.variant.price).toFixed(2) }</div>
                <div className="line-item__quantity">
                    <div className="line-item__quantity--wrapper">
                        <button onClick={() => decrement()} className="line-item__decrement">
                            <Minus />
                        </button>
                        <div className="line-item__count" aria-label="product quantity">
                            {item.quantity}
                        </div>
                        <button onClick={() => incrementItem(item)} className="line-item__increment">
                            <Plus />
                        </button>
                    </div>
                    <button onClick={() => removeFromCart(item)} className="line-item__trash">
                        <Trash />
                    </button>
                </div>
            </div>
        </div>
        {!item.subscription && item.sellingPlan ? (
            <button className="line-item__upgrade" onClick={() => upgradeToSubscription()}>Upgrade to Subscribe & Save 10%</button>
        ) : ""}
        {item.subscription && item.sellingPlan ? (
            <button className="line-item__upgrade bold">Delivery Every 1 Month</button>
        ) : ""}
    </div>
  )
};

export default LineItem;
