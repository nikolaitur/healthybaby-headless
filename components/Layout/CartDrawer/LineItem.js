import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { nacelleClient } from 'services'
import { useCart } from '@nacelle/react-hooks'
import { getCartVariant } from 'utils/getCartVariant'

import Plus from '../../../svgs/plus.svg'
import Minus from '../../../svgs/minus.svg'
import Trash from '../../../svgs/trash.svg'

const LineItem = ({item}) => {
    const [
        { cart },
        { incrementItem, decrementItem, removeFromCart, addToCart },
    ] = useCart()

    let isSubscription = false
    let hasSubscriptionProduct = false

    if (item.variant.tags) {
        item.variant.tags.forEach(tag => {
            tag.includes("Subscription Product") ? isSubscription = true : false
            tag.includes("Subscription handle::") ? hasSubscriptionProduct = tag : false
        });
    }

    const getSubscriptionProduct = (tag) => {
        let handle = tag.split("::")
        const getProduct = async () => {
            await nacelleClient.products({
                handles: handle[1]
            }).then(response => {
                removeFromCart(item)
                addSubscriptionProduct(response)
            })
        }

        getProduct()
    }

    const addSubscriptionProduct = (product) => {
        const variant = getCartVariant({
            product: product[0],
            variant: product[0].variants[0]
        })
        addToCart({
            variant,
            quantity: 1,
            properties: {
                _
            }
        })
    }

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

    const upgradeToSubscription = () => {
        getSubscriptionProduct(hasSubscriptionProduct)
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
        {hasSubscriptionProduct ? (
            <button className="line-item__upgrade" onClick={() => upgradeToSubscription()}>Upgrade to Subscribe & Save 15%</button>
        ) : ""}
    </div>
  )
};

export default LineItem;
